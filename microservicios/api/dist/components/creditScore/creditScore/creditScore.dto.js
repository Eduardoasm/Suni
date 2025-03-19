"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetClientWithCreditScoreType = exports.GetClientsWithCreditScoreType = exports.GetCreditScoreUserInput = exports.CreateCreditScoreUserInput = exports.GetClientWithCreditScoreInput = exports.CreditScoreTypeNotNull = exports.CreditScoreTypePlural = exports.CreditScoreType = exports.CreditScoreTypeName = void 0;
const creditScore_model_1 = require("./creditScore.model");
exports.CreditScoreTypeName = creditScore_model_1.CreditScoreTC.getTypeName();
exports.CreditScoreType = creditScore_model_1.CreditScoreTC.getType();
exports.CreditScoreTypePlural = creditScore_model_1.CreditScoreTC.getTypePlural().getTypeName();
exports.CreditScoreTypeNotNull = creditScore_model_1.CreditScoreTC.getTypeNonNull();
exports.GetClientWithCreditScoreInput = `
  input GetClientWithCreditScoreInput {
    id: String!
  }
`;
exports.CreateCreditScoreUserInput = `
  input CreateCreditScore {
    values: creditScoreValues
  }

  input creditScoreValues {
    referenceNumber: String
    value: Float
    provider: String
  }
`;
exports.GetCreditScoreUserInput = `
  input GetCreditScore {
    userId: String
    startDate: Date
    endDate: Date
  }
`;
exports.GetClientsWithCreditScoreType = `
  type GetClientsWithCreditScoreType {
    clients: [ClientsCSType]
  }
  type ClientsCSType {
    client: ClientCSType
    currentCreditScore: CurrentCreditScoreType
    historicalCreditScore: ${exports.CreditScoreTypeName}
  }
  type ClientCSType {
    id: String
    name: String
    lastname: String
    email: String
    password: String
    biometric: String
    phone: Int
    status: Boolean
    business_id: String
    cashier_business_owner_id: String
    confirm_email: Boolean
    reset_status_pass: Boolean
    verific_code: String
    terms: Boolean
    code_reference: String
    created_at: String
    closed_at: String
    close_code: String
    country: String
    agreedToDataCollection: Boolean
    dni_type: String
    dni_value: String
    metamapStatus: MetamapStatusType
  }

  type CurrentCreditScoreType {
    credoLab: CreditScoreValueType
    suni: CreditScoreValueType
  }

  type CreditScoreValueType {
    range: Int
    referenceNumber: String
    value: Float
    provider: String
    _id: String
    createdAt: Date
    updatedAt: Date
  }

  type MetamapStatusType {
    id: String
    user_id: String
    status: String
    dni_firstName: String
    dni_lastName: String
    dni_type: String
    dni_value: String
    country: String
  }
`;
exports.GetClientWithCreditScoreType = `
  type GetClientWithCreditScoreType {
    client: ClientCSType
    currentCreditScore: CurrentCreditScoreType
    historicalCreditScore: ${exports.CreditScoreTypeName}
  }
`;
//# sourceMappingURL=creditScore.dto.js.map