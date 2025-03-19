const axios = require('axios');

async function transferAmount(amount, fromWalletId, toWalletId, description) {

  const token = process.env.ADMIN_TOKEN;

  const config = {
    method: 'post',
    baseURL: process.env.SERVICE_URL,
    url: '/wallet/transfer',
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: {
      amount,
      from_wallet_id: fromWalletId,
      to_wallet_id: toWalletId,
      description,
    },
  };

  console.log('TransferAmount: ', config.data);
  
  return axios(config);
    
}

module.exports = transferAmount;
