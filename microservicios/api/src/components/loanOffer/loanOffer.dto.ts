import { Types } from 'mongoose';
import { LoanOfferTC } from './loanOffer.model';

export const LoanOfferTypeName = LoanOfferTC.getTypeName();
export const LoanOfferType = LoanOfferTC.getType();
export const LoanOfferTypePlural = LoanOfferTC.getTypePlural().getTypeName();
export const LoanOfferTypeNotNull = LoanOfferTC.getTypeNonNull();

export type TCreateLoanOffer = {
  amount: number;
  lender: string;
  lenderInfo: {
    name: string;
    lastName: string;
    country: string;
    dni: string;
    email: string;
  };
  borrower: string;
  selectedWallet: string;
  interestRate: number;
  expirationDate: Date;
  currency: string;
  installments: number;
  blockId: string;
  blockedAmountInWalletCurrency: number;
  lenderFeeInUSDC: number;
  lenderFeeInWalletCurrency: number;
  referenceNumberOfLoanRequest: number;
};

export type TCancelLoanOffer = {
  _id: Types.ObjectId;
};

export const CancelLoanOfferInput = `
  input CancelLoanOffer {
    _id: MongoID!
  }
`;

export type TGetMyLoanOffers = {
  page: number;
  perPage: number;
  status: string;
  startDate: Date;
  endDate: Date;
};

export const GetMyLoanOffersInput = `
  input GetMyLoanOffers {
    page: Int!
    perPage: Int!
    status: String
    startDate: Date
    endDate: Date
  }
`;
