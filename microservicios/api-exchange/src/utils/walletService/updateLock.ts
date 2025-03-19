import axios from 'axios';
import dayjs from 'dayjs';
import { NoSentryError } from '../NoSentryError';

export interface TUpdateBlock {
  token: string;
  amount: number;
  makerFee: number;
  blockId: string;
}

/**
 * @param token token received from app
 * @param amount the new amount for block/listing
 * @param makerFee the new makerFee for maker
 * @param blockId id for service balance lock (loanAdId)
 */

export async function updateBlock(body: TUpdateBlock): Promise<any> {
  if (!body.token) {
    throw new NoSentryError('Token not provided');
  }

  const date = dayjs();

  const dateToExpire = date.add(30, 'day');

  const formatDateToExpire = dateToExpire.format('YYYY-MM-DD HH:mm:ss');

  try {
    const config = {
      method: 'patch',
      baseURL: process.env.SERVICE_URL,
      url: `/wallet/block/${body.blockId}`,
      headers: {
        authorization: `Bearer ${body.token}`,
      },
      data: {
        amount: body.amount,
        expiresAt: formatDateToExpire,
        serviceFee: body.makerFee,
      },
    };

    const { data } = await axios(config);

    if (!data.success) throw new NoSentryError('Error updating listing');

    return data;
  } catch (error) {
    console.log('Error updating listings', error);
    throw new NoSentryError(error.message ?? 'Error updating listing');
  }
}
