"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyMutations = exports.currencyQueries = exports.pagination = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const currency_dto_1 = require("./currency.dto");
const currency_model_1 = require("./currency.model");
// eslint-disable-next-line import/no-cycle
const currencyService = tslib_1.__importStar(require("./currency.service"));
const createCurrency = graphql_compose_1.schemaComposer.createResolver({
    name: 'createCurrency',
    kind: 'mutation',
    description: 'create a currency',
    type: currency_dto_1.CurrencyType,
    args: {
        data: currency_dto_1.CreateCurrencyInput,
    },
    resolve({ args }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const currency = yield currencyService.create(args === null || args === void 0 ? void 0 : args.data);
            return currency;
        });
    },
});
const currencyQueries = {
    currency: currency_model_1.CurrencyTC.mongooseResolvers.findOne(),
    currencies: currency_model_1.CurrencyTC.mongooseResolvers.findMany({
        limit: { defaultValue: 1000000 },
    }),
};
exports.currencyQueries = currencyQueries;
const currencyMutations = {
    updateCurrency: currency_model_1.CurrencyTC.mongooseResolvers.updateOne(),
    createCurrency,
};
exports.currencyMutations = currencyMutations;
// REST Controller
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const currencies = yield currencyService.find({});
            return res.status(200).json({ success: true, currencies });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.getAll = getAll;
function getOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const currency = yield currencyService.findOne({ _id: req.params._id });
            return res.status(200).json({ success: true, currency });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.getOne = getOne;
function createOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const currency = yield currencyService.create(req.body);
            return res.status(200).json({ success: true, currency });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.createOne = createOne;
function updateOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const currency = yield currencyService.updateOne({ _id: req.params._id }, req.body);
            return res.status(200).json({ success: true, currency });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.updateOne = updateOne;
function pagination(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield currencyService.pagination(Number(req.params.page), Number(req.params.perPage));
            return res.status(200).json({ success: true, pagination: data });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.pagination = pagination;
//# sourceMappingURL=currency.controller.js.map