import axios from 'axios';
import { NoSentryError } from '../NoSentryError';

export async function sendEmail(
  templateId: string,
  token: string,
  variables: object,
  attachmentUrl: string,
  email: string
) {
  if (!token) throw new NoSentryError('Token not provided');

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

  try {
    const { data } = await axios(config);

    if (!data.success) throw new NoSentryError('Error sending email');

    return data;
  } catch (error) {
    console.log(error, 'Error sending email');
    throw new NoSentryError(
      `Error in send email processed to user: ${error.message}`
    );
  }
}
