import mongoose from 'mongoose';
import type { FilterQuery, ProjectionType, QueryOptions, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { ITransaction } from './transaction.model';
import { TCreateTransaction, TCancelTransaction, TNotifyPayment, TReleaseCrypto, TGetTransactionUser, TGetFee } from './transaction.dto';
export declare function getInProgressTransactions(token: string): Promise<{
    makerTransactions: (mongoose.Document<mongoose.Types.ObjectId, any, ITransaction> & ITransaction & {
        _id: mongoose.Types.ObjectId;
    })[];
    takerTransactions: (mongoose.Document<mongoose.Types.ObjectId, any, ITransaction> & ITransaction & {
        _id: mongoose.Types.ObjectId;
    })[];
    totalMakerTransactions: number;
    totalTakerTransactions: number;
    total: number;
}>;
export declare function findOne(filter?: FilterQuery<ITransaction>, projection?: ProjectionType<ITransaction> | null, options?: QueryOptions<ITransaction> | null): Promise<mongoose.Document<mongoose.Types.ObjectId, any, ITransaction> & ITransaction & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function customFindOne(filter?: FilterQuery<ITransaction>, projection?: ProjectionType<ITransaction> | null, options?: QueryOptions<ITransaction> | null): Promise<mongoose.Document<mongoose.Types.ObjectId, any, ITransaction> & ITransaction & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function find(filter?: FilterQuery<ITransaction>, projection?: ProjectionType<ITransaction> | null, options?: QueryOptions<ITransaction> | null): Promise<(mongoose.Document<mongoose.Types.ObjectId, any, ITransaction> & ITransaction & {
    _id: mongoose.Types.ObjectId;
})[]>;
export declare function updateOne(filter: FilterQuery<ITransaction>, update: UpdateQuery<ITransaction> | UpdateWithAggregationPipeline, options?: QueryOptions<ITransaction> | null): Promise<import("mongodb").UpdateResult>;
export declare function create(body: TCreateTransaction, token: string): Promise<mongoose.Document<mongoose.Types.ObjectId, any, ITransaction> & ITransaction & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function cancel(body: TCancelTransaction, token: string): Promise<mongoose.Document<mongoose.Types.ObjectId, any, ITransaction> & ITransaction & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function notifyPayment(body: TNotifyPayment, token: string): Promise<mongoose.Document<mongoose.Types.ObjectId, any, ITransaction> & ITransaction & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function releaseCrypto(body: TReleaseCrypto, token: string): Promise<mongoose.Document<mongoose.Types.ObjectId, any, ITransaction> & ITransaction & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function pagination(page: number, perPage: number, filter?: FilterQuery<ITransaction>, projection?: ProjectionType<ITransaction> | null, options?: QueryOptions<ITransaction> | null): Promise<import("../../utils").Pagination<mongoose.Document<any, any, any>>>;
export declare function getTransactionUser(body: TGetTransactionUser, token: string): Promise<import("../../utils").Pagination<unknown>>;
export declare function getFee(body: TGetFee): Promise<{
    fee: number;
    valid: boolean;
    minTransAmount: number;
}>;
//# sourceMappingURL=transaction.service.d.ts.map