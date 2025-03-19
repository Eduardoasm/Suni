import { Types } from 'mongoose';
import { OfferExpirationRateEnum } from '../offer-expiration';
import { feeTypeEnum } from '../contract-fee-settings';
export declare const SettingsType: import("graphql").GraphQLObjectType<any, any>;
export declare const SettingsTypeName: string;
export declare const SettingsTypePlural: string;
export declare const SettingsTypeNotNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./settings.model").SettingDocument, any>>;
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
export declare const CreateSettingsInput = "\n  input CreateSettings{\n    offerExpiration: offerExpiration!\n    creditScoreParams: [createCreditScoreParams]\n    creditScoreRange: [createCreditScoreRange]\n    contract: contractSettings\n    contractFees: contractFeeSettings\n    maxInterestRate: Float\n    minInterestRate: Float\n  }\n\n  input createCreditScoreParams {\n    name: String!\n    value: Float!\n  }\n\n  input createCreditScoreRange {\n    color: String!\n    initial: Float!\n    final: Float!\n  }\n\n  input offerExpiration {\n    rate: Float!\n    type: String!\n  }\n\n  input contractSettings {\n    minMonthlyPayments: Float\n    maxMonthlyPayments: Float\n    minLoanAmount: Float\n    maxLoanAmount: Float\n    maxAccumulatedDebtor: Float\n    maxAccumulatedDebtorWithCreditor: Float\n    allowedBlocks: Float\n    amountOfBlocksAllowed: Float\n  }\n\n  input contractFeeSettings {\n    moraFee: valueSettings\n    lenderFee: valueSettings\n    borrowerFee: valueSettings\n    borrowerRequestFee: valueSettings\n  }\n    \n  input valueSettings {\n    type: String\n    value: Float\n  }\n";
export type TUpdateSettingsCreditScoreParamsInput = {
    _id?: Types.ObjectId;
    creditScoreParams: Array<TCreditScoreParamsInput>;
};
export declare const updateSettingsCreditScoreParamsInput = "\n  input updateSettingsCreditScoreParams {\n    _id: MongoID!\n    creditScoreParams: [updateCreditScoreParams!]!\n  }\n\n  input updateCreditScoreParams {\n    name: String!\n    value: Float!\n  }\n";
export type TUpdateInternalCreditScoreValueInput = {
    _id?: Types.ObjectId;
    name: string;
    value: number;
};
export declare const updateInternalCreditScoreValueInput = "\n  input updateInternalCreditScoreValue {\n    _id: MongoID!\n    name: String!\n    value: Float!\n  }\n";
export type TUpdateSettings = {
    _id?: Types.ObjectId;
    interestRate: number;
    offerExpiration: TOfferExpirationInput;
    contract: TContractSettings;
    contractFees: TContractFeeSettings;
    maxInterestRate: number;
};
export declare const updateSettingsInput = "\n  input updateSettings {\n    _id: MongoID!\n    interestRate: Float\n    offerExpiration: updateOfferExpiration\n    contract: updateContractSettings\n    contractFees: UpdatecontractFeeSettings\n    maxInterestRate: Float\n  }\n\n  input updateOfferExpiration {\n    rate: Float\n    type: String\n  }\n\n  input updateContractSettings {\n    minMonthlyPayments: Float\n    maxMonthlyPayments: Float\n    minLoanAmount: Float\n    maxLoanAmount: Float\n    maxAccumulatedDebtor: Float\n    maxAccumulatedDebtorWithCreditor: Float\n    allowedBlocks: Float\n    amountOfBlocksAllowed: Float\n  }\n\n  input UpdatecontractFeeSettings {\n    moraFee: Float\n    lenderFee: Float\n    borrowerFee: Float\n    lenderFeePercentage: Float\n    borrowerFeePercentage: Float\n    lenderFeeDiscretionary: Float\n    borrowerFeeDiscretionary: Float\n  }\n";
//# sourceMappingURL=settings.dto.d.ts.map