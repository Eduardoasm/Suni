"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMethodMutations = exports.paymentMethodQueries = exports.updateMany = exports.getPaymentMethodCurrency = exports.updatePaymentMethodUser = exports.cancelPaymentMethod = exports.createPaymentMethod = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const paymentMethod_model_1 = require("./paymentMethod.model");
const paymentMethod_dto_1 = require("./paymentMethod.dto");
const paymentMethodService = tslib_1.__importStar(require("./paymentMethod.service"));
exports.createPaymentMethod = graphql_compose_1.schemaComposer.createResolver({
    name: 'createPaymentMethod',
    kind: 'mutation',
    description: 'create payment Method',
    type: paymentMethod_dto_1.PaymentMethodType,
    args: {
        data: paymentMethod_dto_1.CreatePaymentMethodUserInput,
    },
    resolve({ args, context }) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context.req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization;
            const paymentMethod = yield paymentMethodService.create(args === null || args === void 0 ? void 0 : args.data, token);
            return paymentMethod;
        });
    },
});
exports.cancelPaymentMethod = graphql_compose_1.schemaComposer.createResolver({
    name: 'cancelPaymentMethod',
    kind: 'mutation',
    description: 'cancel payment Method',
    type: paymentMethod_dto_1.CancelPaymentMethodType,
    args: {
        data: paymentMethod_dto_1.CancelPaymentMethodInput,
    },
    resolve({ args, context }) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context.req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization;
            const paymentMethod = yield paymentMethodService.cancelPaymentMethod(args === null || args === void 0 ? void 0 : args.data, token);
            return {
                success: paymentMethod.success,
                paymentMethod: paymentMethod.paymentMethod,
            };
        });
    },
});
exports.updatePaymentMethodUser = graphql_compose_1.schemaComposer.createResolver({
    name: 'updatePaymentMethod',
    kind: 'mutation',
    description: 'cancel payment Method',
    type: paymentMethod_dto_1.PaymentMethodType,
    args: {
        data: paymentMethod_dto_1.UpdatePaymentMethodInput,
    },
    resolve({ args, context }) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context.req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization;
            const paymentMethod = yield paymentMethodService.updatePaymentMethod(args === null || args === void 0 ? void 0 : args.data, token);
            return paymentMethod;
        });
    },
});
exports.getPaymentMethodCurrency = graphql_compose_1.schemaComposer.createResolver({
    name: 'getPaymentMethodUser',
    kind: 'query',
    description: 'get payment Method for currency',
    type: paymentMethod_dto_1.PaymentMethodTypePlural,
    args: {
        data: paymentMethod_dto_1.GetPaymentMethodUserInput,
    },
    resolve({ args, context }) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context.req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization;
            const paymentMethod = yield paymentMethodService.findPaymentMethod(args === null || args === void 0 ? void 0 : args.data, token);
            return paymentMethod;
        });
    },
});
function updateMany(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const updatedPaymentMethods = yield paymentMethodService.updateMany(req.body.filter, req.body.paymentMethodType);
            return res.status(200).json(updatedPaymentMethods);
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.updateMany = updateMany;
const paymentMethodMutations = {
    createPaymentMethod: exports.createPaymentMethod,
    updatePaymentMethod: paymentMethod_model_1.PaymentMethodTC.mongooseResolvers.updateOne(),
    cancelPaymentMethod: exports.cancelPaymentMethod,
    updatePaymentMethodUser: exports.updatePaymentMethodUser,
};
exports.paymentMethodMutations = paymentMethodMutations;
const paymentMethodQueries = {
    paymentMethod: paymentMethod_model_1.PaymentMethodTC.mongooseResolvers.findOne(),
    paymentMethods: paymentMethod_model_1.PaymentMethodTC.mongooseResolvers.findMany(),
    totalPaymentMethods: paymentMethod_model_1.PaymentMethodTC.mongooseResolvers.count(),
    getPaymentMethodCurrency: exports.getPaymentMethodCurrency,
};
exports.paymentMethodQueries = paymentMethodQueries;
//# sourceMappingURL=paymentMethod.controller.js.map