"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMethodValueMutations = exports.paymentMethodValueQueries = exports.updateValuesUser = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const paymentMethodValue_model_1 = require("./paymentMethodValue.model");
const paymentMethodValueService = tslib_1.__importStar(require("./paymentMethodValue.service"));
const paymentMethodValue_dto_1 = require("./paymentMethodValue.dto");
exports.updateValuesUser = graphql_compose_1.schemaComposer.createResolver({
    name: 'updateValuesUser',
    kind: 'mutation',
    description: 'update values for paymentMethodValues',
    type: paymentMethodValue_dto_1.UpdateManyValuesType,
    args: {
        data: paymentMethodValue_dto_1.UpdateManyValuesUserInput,
    },
    resolve({ args }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const paymentMethodValue = yield paymentMethodValueService.updateManyValuesUser(args === null || args === void 0 ? void 0 : args.data);
            return {
                success: paymentMethodValue,
            };
        });
    },
});
const paymentMethodValueMutations = {
    createPaymentMethodValue: paymentMethodValue_model_1.PaymentMethodValueTC.mongooseResolvers.createOne(),
    updatePaymentMethodValue: paymentMethodValue_model_1.PaymentMethodValueTC.mongooseResolvers.updateOne(),
    updateManyPaymentMethodValue: paymentMethodValue_model_1.PaymentMethodValueTC.mongooseResolvers.updateMany(),
    updateValuesUser: exports.updateValuesUser,
};
exports.paymentMethodValueMutations = paymentMethodValueMutations;
const paymentMethodValueQueries = {
    paymentMethodValue: paymentMethodValue_model_1.PaymentMethodValueTC.mongooseResolvers.findOne(),
    paymentMethodsValue: paymentMethodValue_model_1.PaymentMethodValueTC.mongooseResolvers.findMany(),
    totalPaymentMethodsValue: paymentMethodValue_model_1.PaymentMethodValueTC.mongooseResolvers.count(),
};
exports.paymentMethodValueQueries = paymentMethodValueQueries;
//# sourceMappingURL=paymentMethodValue.controller.js.map