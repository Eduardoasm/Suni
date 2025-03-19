import { NoSentryError } from '../NoSentryError';

const btcValueInSats = 100000000;

export function convertToUSDC(coin: string, btcPrice: number, amount: number) {
  if (coin === 'lnd') return (amount / btcValueInSats) * btcPrice;
  throw new NoSentryError('Currency must be lnd');
}
