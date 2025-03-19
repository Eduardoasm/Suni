import axios from 'axios';
import { NoSentryError } from '../NoSentryError';

export interface ITransfer {
  amount: number;
  fromWalletId: string;
  toWalletId: string;
}

export async function transfer(body: ITransfer, token: string) {
  const { amount, fromWalletId, toWalletId } = body;
  if (!token) throw new NoSentryError('Token not provided');
  const config = {
    method: 'post',
    baseURL: process.env.SERVICE_URL,
    url: `/wallet/transfer`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: {
      amount,
      from_wallet_id: fromWalletId,
      to_wallet_id: toWalletId,
    },
  };
  try {
    const response = await axios(config);

    if (!response.data?.success) {
      throw new NoSentryError('Error in transfer transaction');
    }

    return response.data?.data?.[0];
  } catch (error) {
    throw new NoSentryError(`Error in transfer transaction: ${error.message}`);
  }
}
