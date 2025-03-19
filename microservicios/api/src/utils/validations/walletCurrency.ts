import { NoSentryError } from '../NoSentryError';

export async function validateWalletAndTransactionCurrency(
  selectedWallet,
  currency: string
) {
  if (selectedWallet?.type?.toLowerCase() !== currency?.toLowerCase())
    throw new NoSentryError(
      'Wallet currency does not match transaction currency'
    );
}
