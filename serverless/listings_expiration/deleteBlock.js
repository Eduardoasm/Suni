const axios = require('axios');
/**
 * function to search wallet in the wallet services from WAU
 * @param {string} loandAdId block loan ad id
 * @returns userId
 */

function deleteAd(loandAdId) {
  const token = process.env.ADMIN_TOKEN
  const config = {
    method: 'delete',
    baseURL: process.env.SERVICE_URL,
    url: `/wallet/block/${loandAdId}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  return axios(config);
}

module.exports = deleteAd;