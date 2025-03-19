import { Document, Types, Model } from 'mongoose';
import { ITransaction } from '../transaction/transaction.model';
export interface ITransactionHistory {
    _id?: any;
    transaction: Types.ObjectId | ITransaction;
    assetAmount: number;
    currencyAmount: number;
    price: number;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export type TransactionHistoryDocument = Document<Types.ObjectId, any, ITransactionHistory> & ITransactionHistory;
export declare const TransactionHistory: Model<TransactionHistoryDocument, {}, {}, {}, any>;
export declare const TransactionHistoryTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<TransactionHistoryDocument, any>;
//# sourceMappingURL=transactionHistory.model.d.ts.map