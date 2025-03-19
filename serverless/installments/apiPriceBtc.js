const axios = require('axios');

async function apiPriceBtc() {

  try {
    const config = {
      method: 'get',
      baseURL: process.env.SERVICE_URL,
      url: '/btc/price-btc',
    }

    const getPriceBtc = await axios(config);

    const prices = getPriceBtc.data?.data?.data?.prices?.filter(
      (price) => price.exchange === 'bitfinex'
    );

    return prices?.[0]?.price;
  } catch (error) {
    console.log(error, 'Error getting btc price');
    throw new Error(`Error getting btc price ${error}`);
  }
  
}

module.exports = apiPriceBtc;
