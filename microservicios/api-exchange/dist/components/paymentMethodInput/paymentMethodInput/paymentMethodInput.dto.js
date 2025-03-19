"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodInputTypeNonNull = exports.PaymentMethodInputTypePlural = exports.PaymentMethodInputType = exports.PaymentMethodInputTypeName = void 0;
const paymentMethodInput_model_1 = require("./paymentMethodInput.model");
exports.PaymentMethodInputTypeName = paymentMethodInput_model_1.PaymentMethodInputTC.getTypeName();
exports.PaymentMethodInputType = paymentMethodInput_model_1.PaymentMethodInputTC.getType();
exports.PaymentMethodInputTypePlural = paymentMethodInput_model_1.PaymentMethodInputTC.getTypePlural().getTypeName();
exports.PaymentMethodInputTypeNonNull = paymentMethodInput_model_1.PaymentMethodInputTC.getTypeNonNull();
//# sourceMappingURL=paymentMethodInput.dto.js.map