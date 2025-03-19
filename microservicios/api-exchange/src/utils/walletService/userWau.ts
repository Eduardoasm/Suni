import axios from 'axios';
import { NoSentryError } from '../NoSentryError';

/**
 * function to search wallet in the wallet services from WAU
 * @param {string} token received token from app
 * @returns userId
 */

export async function getUser(token: string): Promise<any> {
  if (!token) {
    throw new NoSentryError('Token not provided');
  }

  try {
    const config = {
      method: 'get',
      baseURL: process.env.SERVICE_URL,
      url: '/auth/userinfo',
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios(config);

    if (!data.success) {
      throw new NoSentryError('Error getting user info');
    }

    return data;
  } catch (error) {
    console.log(error);
    throw new NoSentryError(error.message);
  }
}
