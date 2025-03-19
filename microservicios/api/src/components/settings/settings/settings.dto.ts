import { Types } from 'mongoose';
import { SettingsTC } from './settings.model';
import { OfferExpirationRateEnum } from '../offer-expiration';
import { feeTypeEnum } from '../contract-fee-settings';

export const SettingsType = SettingsTC.getType();
export const SettingsTypeName = SettingsTC.getTypeName();
export const SettingsTypePlural = SettingsTC.getTypePlural().getTypeName();
export const SettingsTypeNotNull = SettingsTC.getTypeNonNull();

export type TCreditScoreParamsInput = {
  name: string;
  value: number;
};

export type TCreditScoreRangeInput = {
  color: string;
  initial: number;
  final: number;
};

export type TContractSettings = {
  minMonthlyPayments: number;
  maxMonthlyPayments: number;
  minLoanAmount: number;
  maxLoanAmount: number;
  maxAccumulatedDebtor: number;
  maxAccumulatedDebtorWithCreditor: number;
  allowedBlocks: number;
  amountOfBlocksAllowed: number;
  templateContent: string;
};

export type TContractFeeSettings = {
  moraFee: TValueSettings;
  lenderFee: TValueSettings;
  borrowerFee: TValueSettings;
  borrowerRequestFee: TValueSettings;
};

export type TValueSettings = {
  type: feeTypeEnum;
  value: number;
};

export type TOfferExpirationInput = {
  rate: number;
  type: OfferExpirationRateEnum;
};

export type TSettingsInput = {
  offerExpiration: TOfferExpirationInput;
  creditScoreParams: Array<TCreditScoreParamsInput>;
  creditScoreRange: Array<TCreditScoreRangeInput>;
  contract: TContractSettings;
  contractFees: TContractFeeSettings;
  maxInterestRate: number;
  minInterestRate: number;
};

export const CreateSettingsInput = `
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

export type TUpdateSettingsCreditScoreParamsInput = {
  _id?: Types.ObjectId;
  creditScoreParams: Array<TCreditScoreParamsInput>;
};

export const updateSettingsCreditScoreParamsInput = `
  input updateSettingsCreditScoreParams {
    _id: MongoID!
    creditScoreParams: [updateCreditScoreParams!]!
  }

  input updateCreditScoreParams {
    name: String!
    value: Float!
  }
`;

export type TUpdateInternalCreditScoreValueInput = {
  _id?: Types.ObjectId;
  name: string;
  value: number;
};

export const updateInternalCreditScoreValueInput = `
  input updateInternalCreditScoreValue {
    _id: MongoID!
    name: String!
    value: Float!
  }
`;

export type TUpdateSettings = {
  _id?: Types.ObjectId;
  interestRate: number;
  offerExpiration: TOfferExpirationInput;
  contract: TContractSettings;
  contractFees: TContractFeeSettings;
  maxInterestRate: number;
};

export const updateSettingsInput = `
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
