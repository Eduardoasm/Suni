import axios from 'axios';
import { NoSentryError } from '../NoSentryError';

/**
 * function to search wallet in the wallet services from WAU
 * @param {string} token received token from app
 * @param {string} walletId wallet received from app
 * @returns wallet that exists
 */

export interface IWallet {
  wallet: string;
  name: string;
  balance: number;
  error: string | null;
  business_enabled: string | null;
  type: string;
  blocked_balance: number;
  available_balance: number;
}

export async function getUserWallet(
  token: string,
  walletId: string
): Promise<IWallet> {
  try {
    const config = {
      method: 'get',
      baseURL: process.env.SERVICE_URL,
      url: `/wallet/user-balances/${walletId}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(config);

    if (!response.data?.success) {
      throw new NoSentryError('Error in obtaining data');
    }

    const wallet: IWallet = response.data?.data[0];

    return wallet;
  } catch (error) {
    console.log('Error in get user wallet');
    throw new NoSentryError(`Error in get wallet: ${error}`);
  }
}
