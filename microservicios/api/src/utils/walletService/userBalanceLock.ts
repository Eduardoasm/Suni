import axios from 'axios';
import { NoSentryError } from '../NoSentryError';

export interface TLockBalance {
  token: string;
  walletId: string;
  amount: number;
  expiresAt: Date;
  serviceFee: number;
}
/**
 *
 * @param token token received from app
 * @param walletId wallet received from app
 * @param amount amount to block
 * @param expiresAt block expiration date
 * @param serviceFee fee to take from wallet
 */

export async function balanceLock(body: TLockBalance): Promise<any> {
  const { token, walletId, amount, expiresAt, serviceFee } = body;

  if (!token) {
    throw new NoSentryError('Token not provided');
  }

  const config = {
    method: 'post',
    baseURL: process.env.SERVICE_URL,
    url: `/wallet/block/${walletId}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: {
      amount,
      expiresAt,
      service: 'loan',
      serviceFee,
    },
  };
  try {
    const { data } = await axios(config);

    if (!data.success)
      throw new NoSentryError('Error blocking amount in wallet');

    return data;
  } catch (error) {
    console.log(error, 'Error blocking amount in wallet');
    throw new NoSentryError('Error blocking amount in wallet');
  }
}
