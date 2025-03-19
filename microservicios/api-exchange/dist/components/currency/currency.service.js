"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAssetWallets = exports.getUserWallets = exports.pagination = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
/* eslint-disable import/no-cycle */
const axios_1 = tslib_1.__importDefault(require("axios"));
const utils_1 = require("../../utils");
const currency_model_1 = require("./currency.model");
const assetService = tslib_1.__importStar(require("../asset/asset.service"));
const NoSentryError_1 = require("../../utils/NoSentryError");
const userWau_1 = require("../../utils/walletService/userWau");
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return currency_model_1.Currency.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return currency_model_1.Currency.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return currency_model_1.Currency.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function create(currency) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return currency_model_1.Currency.create(currency);
    });
}
exports.create = create;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, currency_model_1.Currency, filter, projection, options);
    });
}
exports.pagination = pagination;
function getUserWallets(token) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        // const countryAvailable = await countryService.findOne({
        //   code: user.country,
        //   active: true,
        //   disabled: false,
        // });
        // if (!countryAvailable)
        //   throw new NoSentryError(
        //     'Access denied, the country is disabled to the app'
        //   );
        if (!user) {
            throw new NoSentryError_1.NoSentryError('Invalid user');
        }
        const config = {
            method: 'get',
            baseURL: process.env.SERVICE_URL,
            url: `/wallet/user-balances`,
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
        const response = yield (0, axios_1.default)(config);
        if (!((_a = response.data) === null || _a === void 0 ? void 0 : _a.success)) {
            throw new NoSentryError_1.NoSentryError('Error in obtaining data');
        }
        const balances = (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.data;
        return balances;
    });
}
exports.getUserWallets = getUserWallets;
function getUserAssetWallets(body, token) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        // const countryAvailable = await countryService.findOne({
        //   code: user.country,
        //   active: true,
        //   disabled: false,
        // });
        // if (!countryAvailable)
        //   throw new NoSentryError(
        //     'Access denied, the country is disabled to the app'
        //   );
        if (!user) {
            throw new NoSentryError_1.NoSentryError('Invalid user');
        }
        const getAssetWallet = yield assetService.findOne({ _id: body.asset });
        const assetWallet = getAssetWallet.network.toLowerCase();
        const config = {
            method: 'get',
            baseURL: process.env.SERVICE_URL,
            url: `/${assetWallet}/user-balances`,
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
        const response = yield (0, axios_1.default)(config);
        if (!((_a = response.data) === null || _a === void 0 ? void 0 : _a.success)) {
            throw new NoSentryError_1.NoSentryError('Error in obtaining data');
        }
        const balances = (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.data;
        return balances;
    });
}
exports.getUserAssetWallets = getUserAssetWallets;
//# sourceMappingURL=currency.service.js.map