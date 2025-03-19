import { apiPriceBtc } from '../apiPriceBtc';
import { NoSentryError } from '../NoSentryError';

const btcValueInSats = 100000000;

export async function convertSatsToBtc(amount: number) {
  return amount / btcValueInSats;
}

export async function convertSatsToUSDC(amount: number) {
  try {
    return (await convertSatsToBtc(amount)) * (await apiPriceBtc());
  } catch (error) {
    throw new NoSentryError(error.message);
  }
}

export async function convertSatsToUSDCPrice(amount: number, btcPrice: number) {
  return (amount / btcValueInSats) * btcPrice;
}
