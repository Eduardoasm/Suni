"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettingsInput = exports.updateInternalCreditScoreValueInput = exports.updateSettingsCreditScoreParamsInput = exports.CreateSettingsInput = exports.SettingsTypeNotNull = exports.SettingsTypePlural = exports.SettingsTypeName = exports.SettingsType = void 0;
const settings_model_1 = require("./settings.model");
exports.SettingsType = settings_model_1.SettingsTC.getType();
exports.SettingsTypeName = settings_model_1.SettingsTC.getTypeName();
exports.SettingsTypePlural = settings_model_1.SettingsTC.getTypePlural().getTypeName();
exports.SettingsTypeNotNull = settings_model_1.SettingsTC.getTypeNonNull();
exports.CreateSettingsInput = `
  input CreateSettings{
    offerExpiration: offerExpiration!
    creditScoreParams: [createCreditScoreParams]
    creditScoreRange: [createCreditScoreRange]
    contract: contractSettings
    contractFees: contractFeeSettings
    maxInterestRate: Float
    minInterestRate: Float
  }

  input createCreditScoreParams {
    name: String!
    value: Float!
  }

  input createCreditScoreRange {
    color: String!
    initial: Float!
    final: Float!
  }

  input offerExpiration {
    rate: Float!
    type: String!
  }

  input contractSettings {
    minMonthlyPayments: Float
    maxMonthlyPayments: Float
    minLoanAmount: Float
    maxLoanAmount: Float
    maxAccumulatedDebtor: Float
    maxAccumulatedDebtorWithCreditor: Float
    allowedBlocks: Float
    amountOfBlocksAllowed: Float
  }

  input contractFeeSettings {
    moraFee: valueSettings
    lenderFee: valueSettings
    borrowerFee: valueSettings
    borrowerRequestFee: valueSettings
  }
    
  input valueSettings {
    type: String
    value: Float
  }
`;
exports.updateSettingsCreditScoreParamsInput = `
  input updateSettingsCreditScoreParams {
    _id: MongoID!
    creditScoreParams: [updateCreditScoreParams!]!
  }

  input updateCreditScoreParams {
    name: String!
    value: Float!
  }
`;
exports.updateInternalCreditScoreValueInput = `
  input updateInternalCreditScoreValue {
    _id: MongoID!
    name: String!
    value: Float!
  }
`;
exports.updateSettingsInput = `
  input updateSettings {
    _id: MongoID!
    interestRate: Float
    offerExpiration: updateOfferExpiration
    contract: updateContractSettings
    contractFees: UpdatecontractFeeSettings
    maxInterestRate: Float
  }

  input updateOfferExpiration {
    rate: Float
    type: String
  }

  input updateContractSettings {
    minMonthlyPayments: Float
    maxMonthlyPayments: Float
    minLoanAmount: Float
    maxLoanAmount: Float
    maxAccumulatedDebtor: Float
    maxAccumulatedDebtorWithCreditor: Float
    allowedBlocks: Float
    amountOfBlocksAllowed: Float
  }

  input UpdatecontractFeeSettings {
    moraFee: Float
    lenderFee: Float
    borrowerFee: Float
    lenderFeePercentage: Float
    borrowerFeePercentage: Float
    lenderFeeDiscretionary: Float
    borrowerFeeDiscretionary: Float
  }
`;
//# sourceMappingURL=settings.dto.js.map