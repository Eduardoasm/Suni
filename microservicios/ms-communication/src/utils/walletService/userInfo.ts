/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { NoSentryError } from '../NoSentryError';

/**
 * function to search wallet in the wallet services from WAU
 * @param {string} token received token from app
 * @returns userId
 */

export async function getUserInfo(token: string): Promise<any> {
  if (!token) {
    throw new NoSentryError('Token not provided');
  }

  const config = {
    method: 'get',
    baseURL: process.env.SERVICE_URL,
    url: '/auth/userinfo',
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data } = await axios(config);

    if (!data.success) {
      throw new NoSentryError('Unauthenticated');
    }

    return data;
  } catch (error) {
    console.log(error);
    throw new NoSentryError('Unauthenticated');
  }
}
