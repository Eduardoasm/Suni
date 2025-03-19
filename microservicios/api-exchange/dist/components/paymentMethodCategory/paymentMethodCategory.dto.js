"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPaymentMethodCategoryInput = exports.PaymentMethodCategoryTypeNonNull = exports.PaymentMethodCategoryTypePlural = exports.PaymentMethodCategoryType = exports.PaymentMethodCategoryTypeName = void 0;
const paymentMethodCategory_model_1 = require("./paymentMethodCategory.model");
exports.PaymentMethodCategoryTypeName = paymentMethodCategory_model_1.PaymentMethodCategoryTC.getTypeName();
exports.PaymentMethodCategoryType = paymentMethodCategory_model_1.PaymentMethodCategoryTC.getType();
exports.PaymentMethodCategoryTypePlural = paymentMethodCategory_model_1.PaymentMethodCategoryTC.getTypePlural().getTypeName();
exports.PaymentMethodCategoryTypeNonNull = paymentMethodCategory_model_1.PaymentMethodCategoryTC.getTypeNonNull();
exports.GetPaymentMethodCategoryInput = `
  input GetPaymentMethod {
    selected: Boolean
    name: String
    currency: MongoID

  }
`;
//# sourceMappingURL=paymentMethodCategory.dto.js.map