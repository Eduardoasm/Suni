import mongoose from 'mongoose';
import type { FilterQuery, ProjectionType, QueryOptions, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { IAppeal } from './appeal.model';
import { TCancelAppeal, TCreateAppeal } from './appeal.dto';
import { TManageCryptoAdmin } from '../../transaction';
export declare function findOne(filter?: FilterQuery<IAppeal>, projection?: ProjectionType<IAppeal> | null, options?: QueryOptions<IAppeal> | null): Promise<mongoose.Document<unknown, any, IAppeal> & IAppeal & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function find(filter?: FilterQuery<IAppeal>, projection?: ProjectionType<IAppeal> | null, options?: QueryOptions<IAppeal> | null): Promise<(mongoose.Document<unknown, any, IAppeal> & IAppeal & {
    _id: mongoose.Types.ObjectId;
})[]>;
export declare function findAppeal(token: string, filter?: FilterQuery<IAppeal>, projection?: ProjectionType<IAppeal> | null, options?: QueryOptions<IAppeal> | null): Promise<any>;
export declare function getAllAppealInfo(token: string, filter?: FilterQuery<IAppeal>, projection?: ProjectionType<IAppeal> | null, options?: QueryOptions<IAppeal> | null): Promise<any[]>;
export declare function updateOne(filter: FilterQuery<IAppeal>, update: UpdateQuery<IAppeal> | UpdateWithAggregationPipeline, options?: QueryOptions<IAppeal> | null): Promise<import("mongodb").UpdateResult>;
export declare function create(body: TCreateAppeal, token: string): Promise<mongoose.Document<unknown, any, IAppeal> & IAppeal & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function cancelAppeal(body: TCancelAppeal, token: string): Promise<mongoose.Document<unknown, any, IAppeal> & IAppeal & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function pagination(page: number, perPage: number, filter?: FilterQuery<IAppeal>, projection?: ProjectionType<IAppeal> | null, options?: QueryOptions<IAppeal> | null): Promise<import("../../../utils").Pagination<mongoose.Document<any, any, any>>>;
export declare function manageCryptoAdmin(body: TManageCryptoAdmin): Promise<mongoose.Document<mongoose.Types.ObjectId, any, import("../../transaction").ITransaction> & import("../../transaction").ITransaction & {
    _id: mongoose.Types.ObjectId;
}>;
//# sourceMappingURL=appeal.service.d.ts.map