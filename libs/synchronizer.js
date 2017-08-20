import * as dynamoDb from './dynamodb';

module.exports = {
  Sync: synchronize
};

async function synchronize_bestway(currencies) {
  const batches = createDynamoBatches(currencies);
  const writeJobs = batches.map(_ => dynamoDb.batchWrite(_));
  return Promise.all(writeJobs)
}

async function synchronize(currencies) {
  const batches = createDynamoBatches(currencies);

  for (const batch of batches) {
      await dynamoDb.batchWrite(batch);
  }
}

function createDynamoBatches(currencies) {

  var putRequests = currencies.map(_ => {
    var putRequest =
      {
        "PutRequest": {
          "Item": {
            "id": _.id,
            "symbol": _.symbol,
            "name": _.name,
            "price": _.price,
            "price_currency": _.price_currency,
            "percent_change_1h": _.percent_change_1h,
            "percent_change_24h": _.percent_change_24h,
            "percent_change_7d": _.percent_change_7d,
            "last_updated": _.last_updated,
            "source": _.source,
            "keywords": `${_.name.toLowerCase()} ${_.symbol.toLowerCase()}`
          }
        }
      };

    return putRequest;
  });

  var results = [];
  while (putRequests.length) {
    var request = {
      "RequestItems": {
        "currencies": putRequests.splice(0, 25)
      }
    }
    results.push(request);
  }

  return results;
}