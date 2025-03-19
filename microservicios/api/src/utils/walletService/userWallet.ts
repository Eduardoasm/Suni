import axios from 'axios';
import { NoSentryError } from '../NoSentryError';

/**
 * function to search wallet in the wallet services from WAU
 * @param {string} token received token from app
 * @param {string} walletId wallet received from app
 * @returns wallet that exists
 */

export interface IWallet {
  name: string;
  wallet: string;
  balance: number;
  balanceInUSDC: number;
  blockedBalance: number;
  blockedBalanceInUSDC: number;
  availableBalance: number;
  availableBalanceInUSDC: number;
  currency: string;
}

export async function getUserWallet(token: string, walletId: string) {
  const config = {
    method: 'get',
    baseURL: process.env.SERVICE_URL,
    url: `/wallet/user-balances/${walletId}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios(config);

    if (!response.data?.success) {
      throw new NoSentryError('Error getting user wallet');
    }

    return response.data?.data?.[0];
  } catch (error) {
    throw new NoSentryError(`Error in get user wallet ${error.message}`);
  }
}
