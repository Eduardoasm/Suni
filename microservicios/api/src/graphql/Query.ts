import { authQueries } from '../components/auth/auth.controller';
import { userQueries } from '../components/user/user/user.controller';
import { walletQueries } from '../components/wallet/wallet.controller';
import { currencyQueries } from '../components/currency/currency.controller';
import { contractQueries } from '../components/contract/contract/contract.controller';
import { settingsQueries } from '../components/settings/settings/settings.controller';
import { transactionQueries } from '../components/transaction/transaction.controller';
import { historyQueries } from '../components/history/history.controller';
import { notificationQueries } from '../components/notification/notification.controller';
import { loanRequestQueries } from '../components/loanRequest/loanRequest.controller';
import { creditScoreQueries } from '../components/creditScore/creditScore/creditScore.controller';
import { loanOfferQueries } from '../components/loanOffer/loanOffer.controller';
import { countryQueries } from '../components/country/country.controller';

const Query = {
  ...authQueries,
  ...userQueries,
  ...walletQueries,
  ...currencyQueries,
  ...contractQueries,
  ...settingsQueries,
  ...transactionQueries,
  ...historyQueries,
  ...notificationQueries,
  ...loanRequestQueries,
  ...creditScoreQueries,
  ...loanOfferQueries,
  ...countryQueries,
};

export default Query;
