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
import type { FilterQuery, ProjectionType, QueryOptions, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { ITransaction } from './transaction.model';
import { dateTransactionEnum, userTransactionEnum } from './transaction.dto';
export declare function findOne(filter?: FilterQuery<ITransaction>, projection?: ProjectionType<ITransaction> | null, options?: QueryOptions<ITransaction> | null): Promise<import("mongoose").Document<unknown, any, ITransaction> & ITransaction & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function find(filter?: FilterQuery<ITransaction>, projection?: ProjectionType<ITransaction> | null, options?: QueryOptions<ITransaction> | null): Promise<(import("mongoose").Document<unknown, any, ITransaction> & ITransaction & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare function updateOne(filter: FilterQuery<ITransaction>, update: UpdateQuery<ITransaction> | UpdateWithAggregationPipeline, options?: QueryOptions<ITransaction> | null): Promise<import("mongodb").UpdateResult>;
export declare function create(transaction: ITransaction, session?: any): Promise<(import("mongoose").Document<unknown, any, ITransaction> & ITransaction & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare function pagination(page: number, perPage: number, filter?: FilterQuery<ITransaction>, projection?: ProjectionType<ITransaction> | null, options?: QueryOptions<ITransaction> | null): Promise<import("../../utils").Pagination<import("mongoose").Document<any, any, any>>>;
export declare function getAprUserContracts(userId: string, userType: userTransactionEnum): Promise<any>;
export declare function nextPayment(userId: string, userType: userTransactionEnum): Promise<any>;
export declare function getAmountAllCreditsActive(userId: string, userType: userTransactionEnum): Promise<any>;
export declare function getDueAmount(userId: string, userType: userTransactionEnum): Promise<any>;
export declare function getPreviousCreditLimits(userId: string): Promise<any[]>;
export declare function getPreviousContractsReceived(userId: string): Promise<any[]>;
export declare function getBorrowerCreditHistory(token: string): Promise<{
    creditsLimit: Promise<any[]>;
    creditsReceived: Promise<any[]>;
    borrowerLastTransaction: Promise<any>;
}>;
export declare function getTransactionsByDate(userId: string, date: dateTransactionEnum): Promise<(import("mongoose").Document<unknown, any, ITransaction> & ITransaction & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare function getLenderCreditHistory(token: string, date: dateTransactionEnum): Promise<{
    transactionsByDate: Promise<(import("mongoose").Document<unknown, any, ITransaction> & ITransaction & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}>;
export declare function getBorrowerLastTransaction(userId: string): Promise<any>;
export declare function createTransaction(transaction: ITransaction, borrowerId: string, lenderId: string, session?: any): Promise<(import("mongoose").Document<unknown, any, ITransaction> & ITransaction & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
//# sourceMappingURL=transaction.service.d.ts.map