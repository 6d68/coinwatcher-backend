var rp = require('request-promise');

module.exports = {
  Get: getCurrencies
};

function getCurrencies() {
  return rp('https://api.coinmarketcap.com/v1/ticker/?limit=200')
    .then(function (body) {
      var response = JSON.parse(body);

      const currencies = response.map(_ => {
        var currency = 
          {
            "id": _.id,
            "symbol": _.symbol,
            "name": _.name,
            "price": _.price_usd,
            "price_currency": "USD",
            "percent_change_1h": _.percent_change_1h,
            "percent_change_24h": _.percent_change_24h,
            "percent_change_7d": _.percent_change_7d,
            "last_updated": _.last_updated,
            "source": "coinmarketcap"
          }
        
        return currency;
      });

      return currencies;
    });
}