const axios = require('axios');

async function sendEmail(templateId, variables, attachmentUrl, email) {

  const token = process.env.ADMIN_TOKEN;

  const config = {
    method: 'post',
    baseURL: process.env.SERVICE_URL,
    url: `/email/${templateId}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: {
      email,
      variables,
      attachment_url: attachmentUrl,
    },
  };

  console.log('sendEmail: ', config.data);
  return axios(config);
  
}

module.exports = sendEmail;
