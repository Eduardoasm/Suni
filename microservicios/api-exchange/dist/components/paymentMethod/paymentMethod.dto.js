"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePaymentMethodInput = exports.CancelPaymentMethodType = exports.CancelPaymentMethodInput = exports.GetPaymentMethodUserInput = exports.CreatePaymentMethodUserInput = exports.PaymentMethodTypeNonNull = exports.PaymentMethodTypePlural = exports.PaymentMethodType = exports.PaymentMethodTypeName = void 0;
const paymentMethod_model_1 = require("./paymentMethod.model");
exports.PaymentMethodTypeName = paymentMethod_model_1.PaymentMethodTC.getTypeName();
exports.PaymentMethodType = paymentMethod_model_1.PaymentMethodTC.getType();
exports.PaymentMethodTypePlural = paymentMethod_model_1.PaymentMethodTC.getTypePlural().getTypeName();
exports.PaymentMethodTypeNonNull = paymentMethod_model_1.PaymentMethodTC.getTypeNonNull();
exports.CreatePaymentMethodUserInput = `
  input CreatePaymentMethodUser {
    type: MongoID!
    values: [PaymenthMethodValue]!
    requiredInfo: [String]
  }

  input PaymenthMethodValue {
    value: String!
    paymentMethodInput: MongoID!
  }
`;
exports.GetPaymentMethodUserInput = `
  input GetPaymentMethodUser {
    currency: MongoID
  }
`;
exports.CancelPaymentMethodInput = `
  input CancelPaymentMethod {
    paymentMethodId: MongoID!
  }
`;
exports.CancelPaymentMethodType = `
  type CancelPaymentMethodType {
    success: Boolean
    paymentMethod: ${exports.PaymentMethodType}
  }
`;
exports.UpdatePaymentMethodInput = `
  input UpdatePaymentMethod {
    paymentMethodId: MongoID!
    type: MongoID
    values: [PaymenthMethodValueUser!]
    requiredInfo: [String]
  }

  input PaymenthMethodValueUser {
      value: String!
      paymentMethodInput: MongoID!
  }
`;
//# sourceMappingURL=paymentMethod.dto.js.map