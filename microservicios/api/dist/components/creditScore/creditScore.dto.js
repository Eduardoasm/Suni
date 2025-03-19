"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCreditScoreUserInput = exports.CredolabDataType = exports.CredolabDataInput = exports.CreditScoreTypeNotNull = exports.CreditScoreTypePlural = exports.CreditScoreType = exports.CreditScoreTypeName = void 0;
const creditScore_model_1 = require("./creditScore.model");
exports.CreditScoreTypeName = creditScore_model_1.CreditScoreTC.getTypeName();
exports.CreditScoreType = creditScore_model_1.CreditScoreTC.getType();
exports.CreditScoreTypePlural = creditScore_model_1.CreditScoreTC.getTypePlural().getTypeName();
exports.CreditScoreTypeNotNull = creditScore_model_1.CreditScoreTC.getTypeNonNull();
exports.CredolabDataInput = `
  input CredolabData {
    data: String!
    realIp: String!
  }
`;
exports.CredolabDataType = `
  type CredolabDataInfo {
    success: Boolean
  }
`;
exports.GetCreditScoreUserInput = `
  input GetCreditScore {
    _id: MongoID
    provider: String
    startDate: Date
    endDate: Date
  }
`;
//# sourceMappingURL=creditScore.dto.js.map