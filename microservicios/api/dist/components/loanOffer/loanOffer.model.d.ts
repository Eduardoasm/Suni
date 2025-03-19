/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model, Schema, Types, Document } from 'mongoose';
import { ICurrency } from '../currency';
export type LoanOfferStatusEnum = 'active' | 'approved' | 'rejected' | 'canceled' | 'expired';
export interface ILoanOffer {
    _id?: any;
    amount: number;
    installments: number;
    lender: string;
    lenderInfo: {
        name: string;
        lastName: string;
        country: string;
        dni: string;
        email: string;
    };
    borrower: string;
    status?: LoanOfferStatusEnum;
    currency: Types.ObjectId | ICurrency;
    expirationDate: Date;
    selectedWallet: string;
    interestRate: number;
    referenceNumber: number;
    blockId: string;
    blockedAmountInWalletCurrency: number;
    lenderFeeInUSDC: number;
    lenderFeeInWalletCurrency: number;
    active: boolean;
    referenceNumberOfLoanRequest: number;
}
export type LoanOfferDocument = Document<Types.ObjectId, any, ILoanOffer> & ILoanOffer;
export declare const loanOfferSchema: Schema<ILoanOffer, Model<ILoanOffer, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ILoanOffer>;
export declare const LoanOffer: Model<ILoanOffer, {}, {}, {}, any>;
export declare const LoanOfferTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<LoanOfferDocument, any>;
//# sourceMappingURL=loanOffer.model.d.ts.map