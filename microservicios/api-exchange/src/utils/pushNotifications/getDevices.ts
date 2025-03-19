import axios from 'axios';
import { NoSentryError } from '../NoSentryError';
/**
 *@param userId id from user
 *@param token token received from app
 */

export async function getDevices(token: string, userId?: string) {
  try {
    if (!token) {
      throw new NoSentryError('Token not provided');
    }

    const config = {
      method: 'get',
      baseURL: process.env.SERVICE_URL,
      url: `/device/${userId}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios(config);

    if (!data.success) {
      throw new NoSentryError('Error in get devices from user');
    }

    return data.data;
  } catch (error) {
    console.log('Error in get devices');
    throw new NoSentryError(`Error in get devices: ${error.message ?? error}`);
  }
}
