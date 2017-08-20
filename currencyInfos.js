import * as dynamoDb from './libs/dynamodb';
import { success, failure } from './libs/response';

export async function main(event, context, callback) {

  var request = require('request')

  const ids = event.pathParameters.ids.split(';');

  let keys = ids.map(_ => {
    return { 'id': _ }
  });

  var params = {
    "RequestItems": {
      "currencies": {
        "Keys": keys
      }
    }
  }

  try {
    const result = await dynamoDb.batchGet(params);
    callback(null, success(result.Responses.currencies));
  }
  catch (e) {
    console.log(e)
    callback(null, failure("Something went wrong :-("));
  }
};
