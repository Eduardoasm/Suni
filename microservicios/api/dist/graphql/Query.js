"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../components/auth/auth.controller");
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
const Query = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, auth_controller_1.authQueries), user_controller_1.userQueries), wallet_controller_1.walletQueries), currency_controller_1.currencyQueries), contract_controller_1.contractQueries), settings_controller_1.settingsQueries), transaction_controller_1.transactionQueries), history_controller_1.historyQueries), notification_controller_1.notificationQueries), loanRequest_controller_1.loanRequestQueries), creditScore_controller_1.creditScoreQueries), loanOffer_controller_1.loanOfferQueries), country_controller_1.countryQueries);
exports.default = Query;
//# sourceMappingURL=Query.js.map