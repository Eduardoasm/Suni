"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyMutations = exports.currencyQueries = exports.getAssetWalletsUser = exports.getWalletsUser = exports.getAll = void 0;
const tslib_1 = require("tslib");
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const graphql_compose_1 = require("graphql-compose");
const currency_model_1 = require("./currency.model");
const currencyService = tslib_1.__importStar(require("./currency.service"));
const currency_dto_1 = require("./currency.dto");
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const currencies = yield currencyService.find();
            return res.status(200).json(currencies);
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.getAll = getAll;
exports.getWalletsUser = graphql_compose_1.schemaComposer.createResolver({
    name: 'getWalletsUser',
    kind: 'query',
    description: 'get wallets from user',
    type: currency_dto_1.userWalletsType,
    resolve({ context }) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context === null || context === void 0 ? void 0 : context.req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization;
            const wallets = yield currencyService.getUserWallets(token);
            return {
                wallets,
            };
        });
    },
});
exports.getAssetWalletsUser = graphql_compose_1.schemaComposer.createResolver({
    name: 'getWalletsUser',
    kind: 'query',
    description: 'get asset wallets from user',
    type: currency_dto_1.userWalletsType,
    args: {
        data: currency_dto_1.GetAssetWalletsInput,
    },
    resolve({ args, context }) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context === null || context === void 0 ? void 0 : context.req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization;
            const wallets = yield currencyService.getUserAssetWallets(args === null || args === void 0 ? void 0 : args.data, token);
            return {
                wallets,
            };
        });
    },
});
const currencyMutations = {
    createCurrency: currency_model_1.CurrencyTC.mongooseResolvers.createOne(),
    updateCurrency: currency_model_1.CurrencyTC.mongooseResolvers.updateOne(),
};
exports.currencyMutations = currencyMutations;
const currencyQueries = {
    currency: currency_model_1.CurrencyTC.mongooseResolvers.findOne(),
    currencies: currency_model_1.CurrencyTC.mongooseResolvers.findMany(),
    totalCurrency: currency_model_1.CurrencyTC.mongooseResolvers.count(),
    getWalletsUser: exports.getWalletsUser,
    getAssetWalletsUser: exports.getAssetWalletsUser,
};
exports.currencyQueries = currencyQueries;
//# sourceMappingURL=currency.controller.js.map