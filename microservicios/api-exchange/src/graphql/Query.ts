import { listingQueries } from '../components/listing/listing/listing.controller';
import { assetQueries } from '../components/asset/asset.controller';
import { currencyQueries } from '../components/currency/currency.controller';
import { paymentMethodQueries } from '../components/paymentMethod/paymentMethod.controller';
import { paymentMethodValueQueries } from '../components/paymentMethodValue/paymentMethodValue.controller';
import { paymentMethodInputQueries } from '../components/paymentMethodInput/paymentMethodInput';
import { paymentMethodCategoryQueries } from '../components/paymentMethodCategory';
import { transactionQueries } from '../components/transaction/transaction.controller';
import { transactionHistoryQueries } from '../components/transactionHistory/transactionHistory.controller';
import { appealQueries } from '../components/appeal/appeal/appeal.controller';
import { streamChatQueries } from '../components/streamChat/streamChat.controller';
import { settingsQueries } from '../components/settings/settings.controller';
import { countryQueries } from '../components/country/country.controller';
import { bestPriceQueries } from '../components/bestPrice/bestPrice.controller';

const Query = {
  ...listingQueries,
  ...assetQueries,
  ...currencyQueries,
  ...paymentMethodQueries,
  ...paymentMethodValueQueries,
  ...transactionQueries,
  ...transactionHistoryQueries,
  ...appealQueries,
  ...paymentMethodInputQueries,
  ...paymentMethodCategoryQueries,
  ...streamChatQueries,
  ...settingsQueries,
  ...countryQueries,
  ...bestPriceQueries,
};

export default Query;
