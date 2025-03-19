"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../components/auth/auth.controller");
const s3_controller_1 = require("../components/s3/s3.controller");
const user_controller_1 = require("../components/user/user/user.controller");
const wallet_controller_1 = require("../components/wallet/wallet.controller");
const currency_controller_1 = require("../components/currency/currency.controller");
const contract_controller_1 = require("../components/contract/contract/contract.controller");
const settings_controller_1 = require("../components/settings/settings/settings.controller");
const transaction_controller_1 = require("../components/transaction/transaction.controller");
const history_controller_1 = require("../components/history/history.controller");
const notification_controller_1 = require("../components/notification/notification.controller");
const loanRequest_controller_1 = require("../components/loanRequest/loanRequest.controller");
const creditScore_controller_1 = require("../components/creditScore/creditScore/creditScore.controller");
const loanOffer_controller_1 = require("../components/loanOffer/loanOffer.controller");
const country_controller_1 = require("../components/country/country.controller");
const Mutation = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, auth_controller_1.authMutations), s3_controller_1.s3Mutations), user_controller_1.userMutations), wallet_controller_1.walletMutations), currency_controller_1.currencyMutations), contract_controller_1.contractMutations), settings_controller_1.settingsMutations), transaction_controller_1.transactionMutations), history_controller_1.historyMutations), notification_controller_1.notificationMutations), loanRequest_controller_1.loanRequestMutations), creditScore_controller_1.creditScoreMutations), loanOffer_controller_1.loanOfferMutations), country_controller_1.countryMutations);
exports.default = Mutation;
//# sourceMappingURL=Mutation.js.map