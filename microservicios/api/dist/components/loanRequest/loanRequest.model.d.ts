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
import { Schema, Model, Types, Document } from 'mongoose';
import { ICurrency } from '../currency';
import { ILoanOffer } from '../loanOffer/loanOffer.model';
export type LoanRequestStatusEnum = 'active' | 'closed' | 'canceled' | 'expired';
export interface ILoanRequest {
    _id?: any;
    amountInUSDC: number;
    installments: number;
    timesClicked: number;
    selectedWallet: string;
    borrower: string;
    borrowerInfo?: {
        name: string;
        lastName: string;
        country: string;
        dni: string;
        email: string;
    };
    status?: LoanRequestStatusEnum;
    selectedWalletCurrency: Types.ObjectId | ICurrency;
    offers: Array<Types.ObjectId | ILoanOffer>;
    active: boolean;
    referenceNumber: number;
    blockId?: string;
    country?: string;
    creditScore?: number;
}
export type LoanRequestDocument = Document<Types.ObjectId, any, ILoanRequest> & ILoanRequest;
export declare const loanRequestSchema: Schema<ILoanRequest, Model<ILoanRequest, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ILoanRequest>;
export declare const LoanRequest: Model<ILoanRequest, {}, {}, {}, any>;
export declare const LoanRequestTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<LoanRequestDocument, any>;
//# sourceMappingURL=loanRequest.model.d.ts.map