import { Types } from 'mongoose';
import { TransactionRoleEnum, TransactionStatusEnum } from './transaction.model';
export declare const TransactionType: import("graphql").GraphQLObjectType<any, any>;
export declare const TransactionTypeName: string;
export declare const TransactionTypePlural: string;
export declare const TransactionTypeNotNull: string;
export interface TCreateTransaction {
    listingId: Types.ObjectId;
    paymentMethod?: Types.ObjectId;
    amount: number;
    selectedWallet: string;
    maker: string;
}
export declare const CreateTransactionInput = "\n  input CreateTransactionInput {\n    listingId: MongoID!\n    paymentMethod: MongoID\n    amount: Float\n    selectedWallet: String!\n  }\n";
export interface TCancelTransaction {
    transactionId: Types.ObjectId;
}
export declare const CancelTransactionInput = "\n  input CancelTransactionInput {\n    transactionId: MongoID!\n  }\n";
export declare const InProgressTransactionType: string;
export interface TNotifyPayment {
    transactionId: Types.ObjectId;
    paymentMethod?: Types.ObjectId;
}
export declare const NotifyPaymentInput = "\n  input NotifyPaymentInput {\n    transactionId: MongoID!\n    paymentMethod: MongoID\n  }\n";
export declare const FindOneTransactionInput = "\n  input FindOneTransactionInput {\n    _id: MongoID\n    listing: MongoID\n    maker: String\n    taker: String\n    amount: Float\n    status: String\n    appealed: Boolean\n    paymentMethod: MongoID\n    active: Boolean\n    createdAt: Date\n    updatedAt: Date\n    referenceNumber: Int\n    selectedWallet: String\n    loanAdId: String\n    amountUsd: Float\n    makerFee: Float\n    takerFee: Float\n  }\n";
export interface TReleaseCrypto {
    transactionId: Types.ObjectId;
}
export interface TManageCryptoAdmin {
    appealId: Types.ObjectId;
    transactionId: Types.ObjectId;
    decisionType: string;
    finalResultDescription?: string;
}
export declare const ManageCryptoAdminInput = "\n  input ManageCryptoAdminInput {\n    appealId: MongoID!\n    transactionId: MongoID!\n    decisionType: String!\n    finalResultDescription: String\n  }\n";
export type UserRoleEnum = 'maker' | 'taker';
export type TransactionTypeEnum = 'purchase' | 'sale';
export interface TGetFee {
    transactionAmount: number;
    assetNetwork: string;
    transactionType: TransactionTypeEnum;
    userRole: UserRoleEnum;
}
export declare const GetFeeInput = "\n  input GetFeeInput {\n    transactionAmount: Float!\n    assetNetwork: String!\n    transactionType: TransactionTypeEnum!\n    userRole: UserRoleEnum!\n  }\n\n  enum TransactionTypeEnum {\n    purchase\n    sale\n  }\n\n  enum UserRoleEnum {\n    maker\n    taker\n  }\n";
export declare const GetFeeType = "\n  type GetFeeType {\n    fee: Float!\n    valid: Boolean\n    minTransAmount: Float!\n  }\n";
export declare const ReleaseCryptoInput = "\n  input ReleaseCryptoInput {\n    transactionId: MongoID!\n  }\n";
export type TGetTransactionUser = {
    role: TransactionRoleEnum;
    asset: Types.ObjectId;
    page: number;
    perPage: number;
    status: TransactionStatusEnum;
};
export declare const GetTransactionUserInput = "\n  input GetTransactionUser {\n    role: String\n    asset: MongoID\n    page: Int\n    perPage: Int\n    status: String\n  }\n";
export declare const TransactionPaginationType: string;
//# sourceMappingURL=transaction.dto.d.ts.map