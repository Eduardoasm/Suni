"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateForLoanRequestInput = exports.GetUserRequestAmountInput = exports.CancelLoanRequestInput = exports.GetCostsOfRequestType = exports.GetCostsOfRequestInput = exports.GetMarketLoanRequestsInput = exports.GetMyLoanRequestsInput = exports.getOneLoanOfferRequestInput = exports.getLoanOffersForRequestType = exports.getLoanRequestInput = exports.validateForLoanRequestType = exports.getUserRequestAmountsType = exports.getLoanOfferRequestType = exports.CreateLoanOfferInput = exports.CreateLoanRequestInput = exports.LoanRequestTypeNotNull = exports.LoanRequestTypePlural = exports.LoanRequestType = exports.LoanRequestTypeName = void 0;
const loanRequest_model_1 = require("./loanRequest.model");
const loanOffer_1 = require("../loanOffer");
exports.LoanRequestTypeName = loanRequest_model_1.LoanRequestTC.getTypeName();
exports.LoanRequestType = loanRequest_model_1.LoanRequestTC.getType();
exports.LoanRequestTypePlural = loanRequest_model_1.LoanRequestTC.getTypePlural().getTypeName();
exports.LoanRequestTypeNotNull = loanRequest_model_1.LoanRequestTC.getTypeNonNull();
exports.CreateLoanRequestInput = `
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
exports.CreateLoanOfferInput = `
  input CreateLoanOfferInput {
    loanRequest: MongoID!
    selectedWallet: String!
    interestRate: Float!
    currency: String
    expirationHours: Int
    expirationMinutes: Int
  }
`;
exports.getLoanOfferRequestType = `
  type getLoanOfferRequest {
    loanRequest: ${exports.LoanRequestType}!
    loanOffer: ${loanOffer_1.LoanOfferType}!
  }
`;
exports.getUserRequestAmountsType = `
  type getUserRequestAmounts {
    amounts: [Float]
    minAmount: Float
    maxAmount: Float
    availableCredit: Float
}`;
exports.validateForLoanRequestType = `
  type validateForLoanRequestType {
    isAllowed: Boolean
    message: String
  }
`;
exports.getLoanRequestInput = `
  input getLoanRequest {
    loanRequest: MongoID!
  }
`;
exports.getLoanOffersForRequestType = `
  type getLoanOffersForRequest {
    loanOffers: [${loanOffer_1.LoanOfferType}]
  }
`;
exports.getOneLoanOfferRequestInput = `
  input getOneLoanOfferRequest {
    loanRequest: MongoID!
    loanOffer: MongoID!
  }
`;
exports.GetMyLoanRequestsInput = `
  input GetMyLoanRequests {
    page: Int
    perPage: Int
    status: String
    startDate: Date
    endDate: Date
  }
`;
exports.GetMarketLoanRequestsInput = `
  input GetMarketLoanRequests {
    page: Int!
    perPage: Int!
  }
`;
exports.GetCostsOfRequestInput = `
  input GetCostsOfRequestInput {
    currency: String
    amountInUSDC: Float
  }
`;
exports.GetCostsOfRequestType = `
  type GetCostsOfRequestType {
    amountInSATS: Float
    amountInUSDC: Float
  }
`;
exports.CancelLoanRequestInput = `
  input CancelLoanRequest {
    _id: MongoID!
  }
`;
exports.GetUserRequestAmountInput = `
  input GetUserRequestAmount {
    version: Version
  }
`;
exports.ValidateForLoanRequestInput = `
  input ValidateForLoanRequestInput{
    currency: String!
    amount: Float!
    selectedWallet: String!
    installments: Float!
    version: Version
  }
`;
//# sourceMappingURL=loanRequest.dto.js.map