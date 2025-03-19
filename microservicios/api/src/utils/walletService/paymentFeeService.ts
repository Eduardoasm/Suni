import axios from 'axios';
import { NoSentryError } from '../NoSentryError';

export interface TLockBalance {
  token: string;
  walletId: string;
  fee: number;
  service: string;
}
/**
 *
 * @param token token received from app
 * @param walletId wallet user received from app
 * @param fee fee of user for the service
 * @param service service of the fee
 */

export async function paymentServiceFee(body: TLockBalance): Promise<any> {
  const { token, walletId, fee, service } = body;

  if (!token) {
    throw new NoSentryError('Token not provided');
  }

  const config = {
    method: 'post',
    baseURL: process.env.SERVICE_URL,
    url: `/servicefeepayment`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: {
      walletId,
      fee,
      service,
    },
  };
  try {
    const { data } = await axios(config);

    if (!data.success) throw new NoSentryError('Error in payment service fee');

    return data;
  } catch (error) {
    console.log(error, 'General error in payment service fee');
    throw new NoSentryError(`General error in payment service fee ${error}`);
  }
}
