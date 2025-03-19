const axios = require('axios');

/**
 *
 * @param {string} messageTemplateId message template id
 * @param {string} model model of notification: contract | loanRequest | loanOffer | listing | transaction
 * @param {string} module module of services: wallet | loans | exchange
 * @param {ObjectId} object id of object model
 * @param {string} recipientId id of recipient
 * @param {string} senderId id of sender
 * @param {object} variables dynamic variables for message (not required)
 * @return notification created
 */


async function createNotification(
  messageTemplateId,
  model,
  module,
  object,
  recipientId,
  senderId,
  variables
) {

  const config = {
    method: 'post',
    baseURL: process.env.COMMUNICATION_URL,
    url: `/v1/notification`,
    headers: {
      authorization: process.env.ADMIN_TOKEN,
    },
    data: {
      messageTemplateId,
      model,
      module,
      object,
      recipientId,
      senderId,
      variables
    },
  };
  console.log('createNotification: ', config.data);
  return axios(config);
  
}

module.exports = createNotification;
