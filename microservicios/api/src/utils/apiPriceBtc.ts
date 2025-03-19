import axios from 'axios';
import { NoSentryError } from './NoSentryError';

export async function apiPriceBtc(): Promise<number> {
  try {
    const getPriceBtc = await axios.get(
      `${process.env.SERVICE_URL}/btc/price-btc`
    );
    const prices = getPriceBtc.data?.data?.data?.prices?.filter(
      (price) => price.exchange === 'bitfinex'
    );
    return prices?.[0]?.price;
  } catch (error) {
    console.log(error, 'Error getting btc price');
    throw new NoSentryError(`Error in get price btc ${error}`);
  }
}
