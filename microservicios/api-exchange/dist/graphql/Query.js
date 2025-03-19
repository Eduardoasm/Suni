"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listing_controller_1 = require("../components/listing/listing/listing.controller");
const asset_controller_1 = require("../components/asset/asset.controller");
const currency_controller_1 = require("../components/currency/currency.controller");
const paymentMethod_controller_1 = require("../components/paymentMethod/paymentMethod.controller");
const paymentMethodValue_controller_1 = require("../components/paymentMethodValue/paymentMethodValue.controller");
const paymentMethodInput_1 = require("../components/paymentMethodInput/paymentMethodInput");
const paymentMethodCategory_1 = require("../components/paymentMethodCategory");
const transaction_controller_1 = require("../components/transaction/transaction.controller");
const transactionHistory_controller_1 = require("../components/transactionHistory/transactionHistory.controller");
const appeal_controller_1 = require("../components/appeal/appeal/appeal.controller");
const streamChat_controller_1 = require("../components/streamChat/streamChat.controller");
const settings_controller_1 = require("../components/settings/settings.controller");
const country_controller_1 = require("../components/country/country.controller");
const bestPrice_controller_1 = require("../components/bestPrice/bestPrice.controller");
const Query = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, listing_controller_1.listingQueries), asset_controller_1.assetQueries), currency_controller_1.currencyQueries), paymentMethod_controller_1.paymentMethodQueries), paymentMethodValue_controller_1.paymentMethodValueQueries), transaction_controller_1.transactionQueries), transactionHistory_controller_1.transactionHistoryQueries), appeal_controller_1.appealQueries), paymentMethodInput_1.paymentMethodInputQueries), paymentMethodCategory_1.paymentMethodCategoryQueries), streamChat_controller_1.streamChatQueries), settings_controller_1.settingsQueries), country_controller_1.countryQueries), bestPrice_controller_1.bestPriceQueries);
exports.default = Query;
//# sourceMappingURL=Query.js.map