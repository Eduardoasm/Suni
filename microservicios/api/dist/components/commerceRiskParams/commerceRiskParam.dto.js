"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCommerceRiskParamsWithCreditScoreInput = exports.CommerceRiskParamTypeNonNull = exports.CommerceRiskParamTypePlural = exports.CommerceRiskParamType = exports.CommerceRiskParamTypeName = void 0;
const commerceRiskParam_model_1 = require("./commerceRiskParam.model");
exports.CommerceRiskParamTypeName = commerceRiskParam_model_1.CommerceRiskParamTC.getTypeName();
exports.CommerceRiskParamType = commerceRiskParam_model_1.CommerceRiskParamTC.getType();
exports.CommerceRiskParamTypePlural = commerceRiskParam_model_1.CommerceRiskParamTC.getTypePlural().getTypeName();
exports.CommerceRiskParamTypeNonNull = commerceRiskParam_model_1.CommerceRiskParamTC.getTypeNonNull();
exports.GetCommerceRiskParamsWithCreditScoreInput = `
  input GetCommerceRiskParamsWithCreditScore {
    page: Int!
    perPage: Int!
    credolabReferenceNumber: String!
    commerce: String!
    amountUSD: Float!
  }
`;
//# sourceMappingURL=commerceRiskParam.dto.js.map