import axios from 'axios';
import { NoSentryError } from '../NoSentryError';

export interface TUnlockBalance {
  token: string;
  toWalletId: string;
  amount: number;
  destServiceFee: number;
  blockId: string;
}
/**
 *
 * @param token token received from app
 * @param toWalletId wallet id that receives amount
 * @param amount blocked amount
 * @param destServiceFee fee to take from destination
 * @param blockId blocked amount id
 */

export async function unlockBalance(body: TUnlockBalance): Promise<any> {
  const { token, toWalletId, amount, destServiceFee, blockId } = body;

  if (!token) {
    throw new NoSentryError('Token not provided');
  }

  const config = {
    method: 'post',
    baseURL: process.env.SERVICE_URL,
    url: `/wallet/unblock/${blockId}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: {
      toWalletId,
      amount,
      destServiceFee,
    },
  };

  try {
    const { data } = await axios(config);

    if (!data.success)
      throw new NoSentryError('Error unblocking amount in wallet');

    return data;
  } catch (error) {
    console.log(error, 'Error unblocking amount in wallet');
    throw new NoSentryError(`Error unblocking amount in wallet ${error}`);
  }
}
