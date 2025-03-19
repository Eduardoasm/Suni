const axios = require('axios');

/**
 * @param userId id from user IS OPTIONAL
 * @param devicesId list of devices from user IS OPTIONAL
 * @param title title of message IS OPTIONAL
 * @param message body of message
 * @param imageUrl url of image for the view IS OPTIONAL
 * @param url url that will visit if the user clicks on the message IS OPTIONAL
 * @param appData object with data if we need send info in push notifications IS OPTIONAL
 */

async function sendNotifications(userId, title, message) {

    const token = process.env.ADMIN_TOKEN;

    const config = {
      method: 'post',
      baseURL: process.env.SERVICE_URL,
      url: '/push',
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: {
        userId,
        title,
        message,
      },
    };
    console.log('sendPush: ', config.data);
    return axios(config);
  
}

module.exports = sendNotifications;
