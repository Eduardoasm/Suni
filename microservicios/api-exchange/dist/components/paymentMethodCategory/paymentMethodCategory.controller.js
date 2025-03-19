"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMethodCategoryMutations = exports.paymentMethodCategoryQueries = exports.create = exports.updateMany = exports.deleteOne = exports.updateOne = exports.findOne = exports.getAllWithCurrency = exports.getAll = exports.getPaymentMethodCategory = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const paymentMethodCategory_model_1 = require("./paymentMethodCategory.model");
const paymentMethodCategoryService = tslib_1.__importStar(require("./paymentMethodCategory.service"));
const paymentMethodCategory_dto_1 = require("./paymentMethodCategory.dto");
exports.getPaymentMethodCategory = graphql_compose_1.schemaComposer.createResolver({
    name: 'getPaymentMethodCategory',
    kind: 'query',
    description: 'get payment method types',
    type: paymentMethodCategory_dto_1.PaymentMethodCategoryTypePlural,
    args: {
        data: paymentMethodCategory_dto_1.GetPaymentMethodCategoryInput,
    },
    resolve({ args, context }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = context.req.headers.authorization;
            const paymentMethodCategory = yield paymentMethodCategoryService.getPaymentMethodCategory(args === null || args === void 0 ? void 0 : args.data, token);
            return paymentMethodCategory;
        });
    },
});
function getAll(req, res, next) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const paymentMethodCategory = yield paymentMethodCategoryService.find((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.filter);
            return res.status(200).json(paymentMethodCategory);
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.getAll = getAll;
function getAllWithCurrency(req, res, next) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const paymentMethodCategory = yield paymentMethodCategoryService.findPaymentMethodWithCurrency((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.filter);
            return res.status(200).json(paymentMethodCategory);
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.getAllWithCurrency = getAllWithCurrency;
function findOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const paymentMethodCategory = yield paymentMethodCategoryService.findOne({
                _id: req.params._id,
            });
            return res.status(200).json(paymentMethodCategory);
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.findOne = findOne;
function updateOne(req, res, next) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const updatedPaymentMethodCategory = yield paymentMethodCategoryService.updateOne((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.paymentMethodType);
            return res.status(200).json(updatedPaymentMethodCategory);
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.updateOne = updateOne;
function deleteOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const deletedPaymentMethodCategory = yield paymentMethodCategoryService.deleteOne(req.params._id);
            return res.status(200).json(deletedPaymentMethodCategory);
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.deleteOne = deleteOne;
function updateMany(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const methods = yield paymentMethodCategoryService.updateMany(req.body.paymentMethodTypes);
            return res.status(200).json(methods);
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.updateMany = updateMany;
function create(req, res, next) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const newPaymentMethodCategory = yield paymentMethodCategoryService.create((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.paymentMethodType);
            return res.status(200).json(newPaymentMethodCategory);
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.create = create;
const paymentMethodCategoryMutations = {
    createPaymentMethodCategory: paymentMethodCategory_model_1.PaymentMethodCategoryTC.mongooseResolvers.createOne(),
    updatePaymentMethodCategory: paymentMethodCategory_model_1.PaymentMethodCategoryTC.mongooseResolvers.updateOne(),
};
exports.paymentMethodCategoryMutations = paymentMethodCategoryMutations;
const paymentMethodCategoryQueries = {
    paymentMethodCategory: paymentMethodCategory_model_1.PaymentMethodCategoryTC.mongooseResolvers.findOne(),
    paymentMethodsCategory: paymentMethodCategory_model_1.PaymentMethodCategoryTC.mongooseResolvers.findMany(),
    totalPaymentMethodsCategory: paymentMethodCategory_model_1.PaymentMethodCategoryTC.mongooseResolvers.count(),
    getPaymentMethodCategory: exports.getPaymentMethodCategory,
};
exports.paymentMethodCategoryQueries = paymentMethodCategoryQueries;
//# sourceMappingURL=paymentMethodCategory.controller.js.map