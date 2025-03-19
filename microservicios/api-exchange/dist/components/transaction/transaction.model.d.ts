import { Document, Types, Model } from 'mongoose';
import { IPaymentMethod } from '../paymentMethod';
import { IListing } from '../listing/listing/listing.model';
import { IUser } from '../user/user.schema';
export type TransactionRoleEnum = 'purchase' | 'sale';
export type TransactionStatusEnum = 'pending' | 'payment_executed' | 'payment_received' | 'successful' | 'default' | 'cancelled' | 'appealed';
export type timeAppealEnum = 15 | 30 | 45 | 60;
export interface ITransaction {
    _id?: any;
    listing: Types.ObjectId | IListing;
    taker: IUser;
    maker: IUser;
    amount: number;
    status: TransactionStatusEnum;
    appealed: boolean;
    appealedBy?: IUser;
    paymentMethod?: Types.ObjectId | IPaymentMethod;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    referenceNumber: number;
    selectedWallet: string;
    loanAdId: string;
    amountUsd: number;
    makerFee: number;
    takerFee: number;
    fiatAmount: number;
}
export type TransactionDocument = Document<Types.ObjectId, any, ITransaction> & ITransaction;
export declare const Transaction: Model<TransactionDocument, {}, {}, {}, any>;
export declare const TransactionTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<TransactionDocument, any>;
//# sourceMappingURL=transaction.model.d.ts.map