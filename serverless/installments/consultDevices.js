const axios = require('axios');

/**
 * @param userId unique user ID from app
 * @return devices from user
 */

async function consultDevices(userId) {
  const token = process.env.ADMIN_TOKEN;

  const config = {
    method: 'get',
    baseURL: process.env.SERVICE_URL,
    url: `/device/${userId}`,
    headers: {
      authorization: `Bearer ${token}`
    }
  };

  try {
    const { data } = await axios(config);
    return data.data;
  } catch (error) {
    console.log('Error in consult devices: ', error);
  }


}

module.exports = consultDevices