import axios from 'axios';
import dayjs from 'dayjs';
import { NoSentryError } from '../NoSentryError';

export interface TLockBalance {
  token?: string;
  wallet?: string;
  amount?: number;
  makerFee?: number;
}
/**
 *
 * @param token token received from app
 * @param wallet wallet received from app
 * @param amount amount of listing
 * @param makerFee fee of maker
 */

export async function balanceLock(body: TLockBalance): Promise<any> {
  if (!body.token) {
    throw new NoSentryError('Token not provided');
  }

  const date = dayjs();

  const dateToExpire = date.add(30, 'day');

  const formatDateToExpire = dateToExpire.format('YYYY-MM-DD HH:mm:ss');

  const config = {
    method: 'post',
    baseURL: process.env.SERVICE_URL,
    url: `/wallet/block/${body.wallet}`,
    headers: {
      authorization: `Bearer ${body.token}`,
    },
    data: {
      amount: body.amount,
      expiresAt: formatDateToExpire,
      service: 'p2pexchange',
      serviceFee: body.makerFee,
    },
  };

  try {
    const { data } = await axios(config);

    if (!data.success)
      throw new NoSentryError('Error blocking amount in wallet');

    return data;
  } catch (error) {
    console.log(error, 'Error blocking amount in wallet');
    throw new NoSentryError(`Error blocking amount in wallet: ${error}`);
  }
}
