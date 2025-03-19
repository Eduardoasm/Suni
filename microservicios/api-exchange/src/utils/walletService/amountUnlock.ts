import axios from 'axios';
import dayjs from 'dayjs';
import { NoSentryError } from '../NoSentryError';
import { IListing } from '../../components/listing/listing';
import { ITransaction } from '../../components/transaction';

export interface TUnlockBalance {
  token: string;
  toWallet?: string;
  amount: number;
  takerFee: number;
  blockId: string;
}
/**
 *
 * @param token token received from app
 * @param toWallet wallet destination
 * @param amount amount of listing
 * @param takerFee fee of taker
 * @param blockId id for service balance lock (loanAdId)
 */

export async function unlockBalance(body: TUnlockBalance): Promise<any> {
  if (!body.token) {
    throw new NoSentryError('Token not provided');
  }

  try {
    const config = {
      method: 'post',
      baseURL: process.env.SERVICE_URL,
      url: `/wallet/unblock/${body.blockId}`,
      headers: {
        authorization: `Bearer ${body.token}`,
      },
      data: {
        toWalletId: body.toWallet,
        amount: body.amount,
        destServiceFee: body.takerFee,
      },
    };

    const { data } = await axios(config);

    if (!data.success)
      throw new NoSentryError('Error unlocking amount in wallet');

    return data.success;
  } catch (error) {
    console.log(`Error unlocking amount in wallet ${error}`);
    throw new NoSentryError(
      error.message ?? 'Error unlocking amount in wallet'
    );
  }
}
