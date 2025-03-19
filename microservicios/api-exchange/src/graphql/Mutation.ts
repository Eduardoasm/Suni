import { listingMutations } from '../components/listing/listing/listing.controller';
import { assetMutations } from '../components/asset/asset.controller';
import { currencyMutations } from '../components/currency/currency.controller';
import { paymentMethodMutations } from '../components/paymentMethod/paymentMethod.controller';
import { paymentMethodValueMutations } from '../components/paymentMethodValue';
import { paymentMethodInputMutations } from '../components/paymentMethodInput/paymentMethodInput';
import { paymentMethodCategoryMutations } from '../components/paymentMethodCategory';
import { transactionMutations } from '../components/transaction/transaction.controller';
import { transactionHistoryMutations } from '../components/transactionHistory/transactionHistory.controller';
import { appealMutations } from '../components/appeal/appeal/appeal.controller';
import { s3Mutations } from '../components/s3/s3.controller';
import { settingsMutations } from '../components/settings/settings.controller';
import { countryMutations } from '../components/country/country.controller';
import { bestPriceMutations } from '../components/bestPrice/bestPrice.controller';

const Mutation = {
  ...s3Mutations,
  ...listingMutations,
  ...assetMutations,
  ...currencyMutations,
  ...paymentMethodMutations,
  ...paymentMethodValueMutations,
  ...transactionMutations,
  ...transactionHistoryMutations,
  ...appealMutations,
  ...paymentMethodInputMutations,
  ...paymentMethodCategoryMutations,
  ...settingsMutations,
  ...countryMutations,
  ...bestPriceMutations,
};

export default Mutation;
