import { apiPriceBtc } from './apiPriceBtc';
import { NoSentryError } from './NoSentryError';

const btcValueInSats = 100000000;

export async function getAmountInSats(amount: number) {
  try {
    return (amount / (await apiPriceBtc())) * btcValueInSats;
  } catch (error) {
    throw new NoSentryError(error.message);
  }
}
