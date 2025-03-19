const axios = require('axios');

async function currencyExchangeRate(currencies) {

  try {

    const accessKey = process.env.ACCESS_KEY;
      
    const config = {
      method: 'get',
      baseURL: process.env.CURRENCY_SERVICE_URL,
      url:`/live?access_key=${accessKey}&currencies=${currencies}&source=USD&format=1`
    }

    const { data } = await axios(config);
    
    return data.quotes;
  } catch (error) {
    console.log('Error in get rate of currencies');
    throw error
  }
}

module.exports = currencyExchangeRate;