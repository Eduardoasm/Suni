"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelAppealInput = exports.CreateAppealInput = exports.AppealTypeNonNull = exports.AppealTypePlural = exports.AppealType = exports.AppealTypeName = void 0;
const appeal_model_1 = require("./appeal.model");
exports.AppealTypeName = appeal_model_1.AppealTC.getTypeName();
exports.AppealType = appeal_model_1.AppealTC.getType();
exports.AppealTypePlural = appeal_model_1.AppealTC.getTypePlural().getTypeName();
exports.AppealTypeNonNull = appeal_model_1.AppealTC.getTypeNonNull();
exports.CreateAppealInput = `
  input CreateAppeal {
    transaction: MongoID!
    description: String!
    paymentReceipt: [MultimediaInput]
    reason: String!
  }

  input MultimediaInput {
    src: String
    alt: String
    type: String
  }
`;
exports.CancelAppealInput = `
  input CancelAppeal {
    transactionId: MongoID!
  }
`;
//# sourceMappingURL=appeal.dto.js.map