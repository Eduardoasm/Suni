"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMethodInputMutations = exports.paymentMethodInputQueries = void 0;
const paymentMethodInput_model_1 = require("./paymentMethodInput.model");
const paymentMethodInputMutations = {
    createPaymentMethodInput: paymentMethodInput_model_1.PaymentMethodInputTC.mongooseResolvers.createOne(),
    updatePaymentMethodInput: paymentMethodInput_model_1.PaymentMethodInputTC.mongooseResolvers.updateOne(),
};
exports.paymentMethodInputMutations = paymentMethodInputMutations;
const paymentMethodInputQueries = {
    paymentMethodInput: paymentMethodInput_model_1.PaymentMethodInputTC.mongooseResolvers.findOne(),
    paymentMethodsInput: paymentMethodInput_model_1.PaymentMethodInputTC.mongooseResolvers.findMany(),
    totalPaymentMethodsInput: paymentMethodInput_model_1.PaymentMethodInputTC.mongooseResolvers.count(),
};
exports.paymentMethodInputQueries = paymentMethodInputQueries;
//# sourceMappingURL=paymentMethodInput.controller.js.map