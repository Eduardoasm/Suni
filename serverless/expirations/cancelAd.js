const axios = require('axios');

/**
 * function to search wallet in the wallet services from WAU
 * @param blockId blockid of offer
 */

async function deleteBlock(blockId) {
  const token = process.env.ADMIN_TOKEN;

  const config = {
    method: 'delete',
    baseURL: process.env.SERVICE_URL,
    url: `/wallet/block/${blockId}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  return axios(config);
}

module.exports = deleteBlock;
