import axios from 'axios';
import { NoSentryError } from './NoSentryError';

export async function apiVesUsd(): Promise<number> {
  try {
    const getPriceBtc = await axios.get(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-ee983e92-3084-40d6-afe7-3dd5b713b12f/dollar/bcv'
    );
    const priceBtc = getPriceBtc.data?.dollar_bcv;

    return Number(priceBtc);
  } catch (error) {
    throw new NoSentryError(error);
  }
}
