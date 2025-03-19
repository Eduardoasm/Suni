"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateManyValuesType = exports.UpdateManyValuesUserInput = exports.PaymentMethodValueTypesNonNull = exports.PaymentMethodValueTypesPlural = exports.PaymentMethodValueTypes = exports.PaymentMethodValueTypesName = void 0;
const paymentMethodValue_model_1 = require("./paymentMethodValue.model");
exports.PaymentMethodValueTypesName = paymentMethodValue_model_1.PaymentMethodValueTC.getTypeName();
exports.PaymentMethodValueTypes = paymentMethodValue_model_1.PaymentMethodValueTC.getType();
exports.PaymentMethodValueTypesPlural = paymentMethodValue_model_1.PaymentMethodValueTC.getTypePlural().getTypeName();
exports.PaymentMethodValueTypesNonNull = paymentMethodValue_model_1.PaymentMethodValueTC.getTypeNonNull();
exports.UpdateManyValuesUserInput = `
  input UpdateManyValuesUser {
    items: [Values!]
    idPaymentMethod: MongoID!
  }

  input Values {
    _id: MongoID!
    value: String!
  }
`;
exports.UpdateManyValuesType = `
  type UpdateManyValues {
    success: Boolean!
  }
`;
//# sourceMappingURL=paymentMethodValue.dto.js.map