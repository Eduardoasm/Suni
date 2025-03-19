"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listing_controller_1 = require("../components/listing/listing/listing.controller");
const asset_controller_1 = require("../components/asset/asset.controller");
const currency_controller_1 = require("../components/currency/currency.controller");
const paymentMethod_controller_1 = require("../components/paymentMethod/paymentMethod.controller");
const paymentMethodValue_1 = require("../components/paymentMethodValue");
const paymentMethodInput_1 = require("../components/paymentMethodInput/paymentMethodInput");
const paymentMethodCategory_1 = require("../components/paymentMethodCategory");
const transaction_controller_1 = require("../components/transaction/transaction.controller");
const transactionHistory_controller_1 = require("../components/transactionHistory/transactionHistory.controller");
const appeal_controller_1 = require("../components/appeal/appeal/appeal.controller");
const s3_controller_1 = require("../components/s3/s3.controller");
const settings_controller_1 = require("../components/settings/settings.controller");
const country_controller_1 = require("../components/country/country.controller");
const bestPrice_controller_1 = require("../components/bestPrice/bestPrice.controller");
const Mutation = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, s3_controller_1.s3Mutations), listing_controller_1.listingMutations), asset_controller_1.assetMutations), currency_controller_1.currencyMutations), paymentMethod_controller_1.paymentMethodMutations), paymentMethodValue_1.paymentMethodValueMutations), transaction_controller_1.transactionMutations), transactionHistory_controller_1.transactionHistoryMutations), appeal_controller_1.appealMutations), paymentMethodInput_1.paymentMethodInputMutations), paymentMethodCategory_1.paymentMethodCategoryMutations), settings_controller_1.settingsMutations), country_controller_1.countryMutations), bestPrice_controller_1.bestPriceMutations);
exports.default = Mutation;
//# sourceMappingURL=Mutation.js.map