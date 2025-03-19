import { Types } from 'mongoose';
import { LoanRequestTC } from './loanRequest.model';
import { LoanOfferType } from '../loanOffer';

export const LoanRequestTypeName = LoanRequestTC.getTypeName();
export const LoanRequestType = LoanRequestTC.getType();
export const LoanRequestTypePlural =
  LoanRequestTC.getTypePlural().getTypeName();
export const LoanRequestTypeNotNull = LoanRequestTC.getTypeNonNull();

export type versionEnum = 'v2';

export type TCreateLoanRequest = {
  currency: string;
  selectedWallet: string;
  amount: number;
  installments: number;
  credolabReferenceNumber: string;
  version?: versionEnum;
};

export const CreateLoanRequestInput = `
  input CreateLoanRequest {
    currency: String!
    selectedWallet: String!
    amount: Float!
    installments: Int!
    credolabReferenceNumber: String!
    version: Version
  }

  enum Version {
    v2
  }
`;

export type TCreateLoanOffer = {
  loanRequest: Types.ObjectId;
  selectedWallet: string;
  interestRate: number;
  currency: string;
  expirationHours: number;
  expirationMinutes: number;
};

export const CreateLoanOfferInput = `
  input CreateLoanOfferInput {
    loanRequest: MongoID!
    selectedWallet: String!
    interestRate: Float!
    currency: String
    expirationHours: Int
    expirationMinutes: Int
  }
`;

export const getLoanOfferRequestType = `
  type getLoanOfferRequest {
    loanRequest: ${LoanRequestType}!
    loanOffer: ${LoanOfferType}!
  }
`;

export const getUserRequestAmountsType = `
  type getUserRequestAmounts {
    amounts: [Float]
    minAmount: Float
    maxAmount: Float
    availableCredit: Float
}`;

export const validateForLoanRequestType = `
  type validateForLoanRequestType {
    isAllowed: Boolean
    message: String
  }
`;

export type TGetLoanRequest = {
  loanRequest: Types.ObjectId;
};

export type TGetLoanOfferRequest = {
  loanRequest: Types.ObjectId;
  loanOffer: Types.ObjectId;
};

export const getLoanRequestInput = `
  input getLoanRequest {
    loanRequest: MongoID!
  }
`;

export const getLoanOffersForRequestType = `
  type getLoanOffersForRequest {
    loanOffers: [${LoanOfferType}]
  }
`;

export const getOneLoanOfferRequestInput = `
  input getOneLoanOfferRequest {
    loanRequest: MongoID!
    loanOffer: MongoID!
  }
`;

export type TGetMyLoanRequest = {
  page: number;
  perPage: number;
  status: string;
  startDate: Date;
  endDate: Date;
};

export const GetMyLoanRequestsInput = `
  input GetMyLoanRequests {
    page: Int
    perPage: Int
    status: String
    startDate: Date
    endDate: Date
  }
`;

export type TGetMarketLoanRequests = {
  page: number;
  perPage: number;
};

export const GetMarketLoanRequestsInput = `
  input GetMarketLoanRequests {
    page: Int!
    perPage: Int!
  }
`;

export type TGetCostsOfRequest = {
  currency: string;
  amountInUSDC: number;
};

export const GetCostsOfRequestInput = `
  input GetCostsOfRequestInput {
    currency: String
    amountInUSDC: Float
  }
`;

export const GetCostsOfRequestType = `
  type GetCostsOfRequestType {
    amountInSATS: Float
    amountInUSDC: Float
  }
`;

export type TCancelLoanRequest = {
  _id: Types.ObjectId;
};

export const CancelLoanRequestInput = `
  input CancelLoanRequest {
    _id: MongoID!
  }
`;

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

export const GetUserRequestAmountInput = `
  input GetUserRequestAmount {
    version: Version
  }
`;

export const ValidateForLoanRequestInput = `
  input ValidateForLoanRequestInput{
    currency: String!
    amount: Float!
    selectedWallet: String!
    installments: Float!
    version: Version
  }
`;
