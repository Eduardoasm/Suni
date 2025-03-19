import { Types } from 'mongoose';
export declare const LoanRequestTypeName: string;
export declare const LoanRequestType: import("graphql").GraphQLObjectType<any, any>;
export declare const LoanRequestTypePlural: string;
export declare const LoanRequestTypeNotNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./loanRequest.model").LoanRequestDocument, any>>;
export type versionEnum = 'v2';
export type TCreateLoanRequest = {
    currency: string;
    selectedWallet: string;
    amount: number;
    installments: number;
    credolabReferenceNumber: string;
    version?: versionEnum;
};
export declare const CreateLoanRequestInput = "\n  input CreateLoanRequest {\n    currency: String!\n    selectedWallet: String!\n    amount: Float!\n    installments: Int!\n    credolabReferenceNumber: String!\n    version: Version\n  }\n\n  enum Version {\n    v2\n  }\n";
export type TCreateLoanOffer = {
    loanRequest: Types.ObjectId;
    selectedWallet: string;
    interestRate: number;
    currency: string;
    expirationHours: number;
    expirationMinutes: number;
};
export declare const CreateLoanOfferInput = "\n  input CreateLoanOfferInput {\n    loanRequest: MongoID!\n    selectedWallet: String!\n    interestRate: Float!\n    currency: String\n    expirationHours: Int\n    expirationMinutes: Int\n  }\n";
export declare const getLoanOfferRequestType: string;
export declare const getUserRequestAmountsType = "\n  type getUserRequestAmounts {\n    amounts: [Float]\n    minAmount: Float\n    maxAmount: Float\n    availableCredit: Float\n}";
export declare const validateForLoanRequestType = "\n  type validateForLoanRequestType {\n    isAllowed: Boolean\n    message: String\n  }\n";
export type TGetLoanRequest = {
    loanRequest: Types.ObjectId;
};
export type TGetLoanOfferRequest = {
    loanRequest: Types.ObjectId;
    loanOffer: Types.ObjectId;
};
export declare const getLoanRequestInput = "\n  input getLoanRequest {\n    loanRequest: MongoID!\n  }\n";
export declare const getLoanOffersForRequestType: string;
export declare const getOneLoanOfferRequestInput = "\n  input getOneLoanOfferRequest {\n    loanRequest: MongoID!\n    loanOffer: MongoID!\n  }\n";
export type TGetMyLoanRequest = {
    page: number;
    perPage: number;
    status: string;
    startDate: Date;
    endDate: Date;
};
export declare const GetMyLoanRequestsInput = "\n  input GetMyLoanRequests {\n    page: Int\n    perPage: Int\n    status: String\n    startDate: Date\n    endDate: Date\n  }\n";
export type TGetMarketLoanRequests = {
    page: number;
    perPage: number;
};
export declare const GetMarketLoanRequestsInput = "\n  input GetMarketLoanRequests {\n    page: Int!\n    perPage: Int!\n  }\n";
export type TGetCostsOfRequest = {
    currency: string;
    amountInUSDC: number;
};
export declare const GetCostsOfRequestInput = "\n  input GetCostsOfRequestInput {\n    currency: String\n    amountInUSDC: Float\n  }\n";
export declare const GetCostsOfRequestType = "\n  type GetCostsOfRequestType {\n    amountInSATS: Float\n    amountInUSDC: Float\n  }\n";
export type TCancelLoanRequest = {
    _id: Types.ObjectId;
};
export declare const CancelLoanRequestInput = "\n  input CancelLoanRequest {\n    _id: MongoID!\n  }\n";
export type TGetUserRequestAmount = {
    version?: versionEnum;
};
export type TValidateForLoanRequest = {
    currency: string;
    amount: number;
    selectedWallet: string;
    installments: number;
    version?: versionEnum;
};
export declare const GetUserRequestAmountInput = "\n  input GetUserRequestAmount {\n    version: Version\n  }\n";
export declare const ValidateForLoanRequestInput = "\n  input ValidateForLoanRequestInput{\n    currency: String!\n    amount: Float!\n    selectedWallet: String!\n    installments: Float!\n    version: Version\n  }\n";
//# sourceMappingURL=loanRequest.dto.d.ts.map