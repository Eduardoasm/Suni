import { Types } from 'mongoose';
export declare const LoanOfferTypeName: string;
export declare const LoanOfferType: import("graphql").GraphQLObjectType<any, any>;
export declare const LoanOfferTypePlural: string;
export declare const LoanOfferTypeNotNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./loanOffer.model").LoanOfferDocument, any>>;
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
export declare const CancelLoanOfferInput = "\n  input CancelLoanOffer {\n    _id: MongoID!\n  }\n";
export type TGetMyLoanOffers = {
    page: number;
    perPage: number;
    status: string;
    startDate: Date;
    endDate: Date;
};
export declare const GetMyLoanOffersInput = "\n  input GetMyLoanOffers {\n    page: Int!\n    perPage: Int!\n    status: String\n    startDate: Date\n    endDate: Date\n  }\n";
//# sourceMappingURL=loanOffer.dto.d.ts.map