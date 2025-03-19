const axios = require('axios');

/**
 * function to search wallet in the wallet services from WAU
 * @param {string} token received token from app
 * @param {string} walletId wallet received from app
 * @returns wallet that exists
 */

async function getUserWallet(walletId) {
  const token = process.env.ADMIN_TOKEN;

  const config = {
    method: 'get',
    baseURL: process.env.SERVICE_URL,
    url: `/wallet/balance/${walletId}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios(config);

    if (!response.data?.success) {
      throw new Error('Error getting user wallet');
    }

    return response.data?.data?.[0];
  } catch (error) {
    throw new Error(`Error in get user wallet ${error.message}`);
  }
}

module.exports = getUserWallet;
