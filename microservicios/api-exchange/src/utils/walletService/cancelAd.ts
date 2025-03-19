import mongoose from 'mongoose';
import axios from 'axios';
import { NoSentryError } from '../NoSentryError';

/**
 * function to search wallet in the wallet services from WAU
 * @param {string} token received token from app
 * @returns userId
 */

export async function deleteAd(token: string, loandAdId: string): Promise<any> {
  try {
    if (!token) {
      throw new NoSentryError('Token not provided');
    }

    const config = {
      method: 'delete',
      baseURL: process.env.SERVICE_URL,
      url: `/wallet/block/${loandAdId}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios(config);

    if (!data.success) {
      throw new NoSentryError('Error in delete ad');
    }

    return data;
  } catch (error) {
    console.log('Error in cancel ad');
    throw new NoSentryError(`Error in cancel ad: ${error}`);
  }
}
