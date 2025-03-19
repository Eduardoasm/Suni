import { NoSentryError } from '../NoSentryError';

const btcValueInSats = 100000000;

export async function convertFromUSDC(
  coin: string,
  btcPrice: number,
  amount: number
) {
  if (coin.toLowerCase() === 'lnd')
    return Math.round((amount / btcPrice) * btcValueInSats);
  throw new NoSentryError('Currency must be lnd');
}
