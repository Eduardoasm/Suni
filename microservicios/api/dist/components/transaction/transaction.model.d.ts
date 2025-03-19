import { Types, Model, Document } from 'mongoose';
import { IContract } from '../contract/contract';
import { IPaymentPlan } from '../contract/payment-plan';
export type transactionTypeEnum = 'investment' | 'payment';
export type EventEnum = 'loanConcluded';
export interface ITransaction {
    _id?: any;
    contract: Types.ObjectId | IContract;
    from: string;
    to: string;
    amount: number;
    lenderFee: number;
    borrowerFee: number;
    interest: number;
    type: transactionTypeEnum;
    borrowerCreditLimit?: number;
    borrowerDueAmount?: number;
    borrowerNextPayment?: IPaymentPlan;
    borrowerActiveLoans?: number;
    borrowerAverageRate?: number;
    borrowedByBorrower?: number;
    event?: EventEnum;
    lenderDueAmount?: number;
    lenderNextPayment?: IPaymentPlan;
    lenderActiveLoans?: number;
    lenderAverageRate?: number;
    lendedByLender?: number;
    commerce?: string;
    commerceInterestEarnings?: number;
    commerceIssuedLoans?: number;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export type TransactionDocument = Document<Types.ObjectId, any, ITransaction> & ITransaction;
export declare const Transaction: Model<ITransaction, {}, {}, {}, any>;
export declare const TransactionTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<TransactionDocument, any>;
//# sourceMappingURL=transaction.model.d.ts.map