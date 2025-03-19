import { ISettings } from '../../components/settings/settings.model';
import { IAsset } from '../../components/asset/asset.model';
import { TCreateListing } from '../../components/listing/listing/listing.dto';
import { NoSentryError } from '../NoSentryError';
import { TCreateTransaction } from '../../components/transaction/transaction.dto';

export async function validateBtcTransAmount(
  settings: ISettings,
  asset: IAsset,
  transaction: TCreateTransaction | TCreateListing
) {
  if (
    asset.network === 'BTC' &&
    transaction.amount < settings.btc.minTransAmount
  ) {
    throw new NoSentryError('Invalid transaction amount.');
  }
  return transaction;
}
