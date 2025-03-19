import { authMutations } from '../components/auth/auth.controller';
import { s3Mutations } from '../components/s3/s3.controller';
import { userMutations } from '../components/user/user/user.controller';
import { walletMutations } from '../components/wallet/wallet.controller';
import { currencyMutations } from '../components/currency/currency.controller';
import { contractMutations } from '../components/contract/contract/contract.controller';
import { settingsMutations } from '../components/settings/settings/settings.controller';
import { transactionMutations } from '../components/transaction/transaction.controller';
import { historyMutations } from '../components/history/history.controller';
import { notificationMutations } from '../components/notification/notification.controller';
import { loanRequestMutations } from '../components/loanRequest/loanRequest.controller';
import { creditScoreMutations } from '../components/creditScore/creditScore/creditScore.controller';
import { loanOfferMutations } from '../components/loanOffer/loanOffer.controller';
import { countryMutations } from '../components/country/country.controller';

const Mutation = {
  ...authMutations,
  ...s3Mutations,
  ...userMutations,
  ...walletMutations,
  ...currencyMutations,
  ...contractMutations,
  ...settingsMutations,
  ...transactionMutations,
  ...historyMutations,
  ...notificationMutations,
  ...loanRequestMutations,
  ...creditScoreMutations,
  ...loanOfferMutations,
  ...countryMutations,
};

export default Mutation;
