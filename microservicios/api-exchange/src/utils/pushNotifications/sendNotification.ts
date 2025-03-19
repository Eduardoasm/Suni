import axios from 'axios';
import { NoSentryError } from '../NoSentryError';

/**
 * @param userId id from user IS OPTIONAL
 * @param devicesId list of devices from user IS OPTIONAL
 * @param title title of message IS OPTIONAL
 * @param message body of message
 * @param imageUrl url of image for the view IS OPTIONAL
 * @param url url that will visit if the user clicks on the message IS OPTIONAL
 * @param appData object with data if we need send info in push notifications IS OPTIONAL
 */

export interface TSendNotifications {
  token: string;
  userId?: string;
  devicesId?: Array<string>;
  title?: string;
  message: string;
  imageUrl?: string;
  url?: string;
  appData?: any;
}

export async function sendNotifications(bodyNotifications: TSendNotifications) {
  const { token, userId, title, message } = bodyNotifications;
  try {
    if (!token) {
      throw new NoSentryError('Token not provided');
    }

    const config = {
      method: 'post',
      baseURL: process.env.SERVICE_URL,
      url: '/push',
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: {
        userId,
        // devicesId,
        title,
        message,
        // imageUrl,
        // url,
        // appData,
      },
    };

    const response = await axios(config);

    if (!response.data.success) {
      console.log('Error sending notifications');
    }

    return response;
  } catch (error) {
    console.log('Error sending notifications');
  }
}
