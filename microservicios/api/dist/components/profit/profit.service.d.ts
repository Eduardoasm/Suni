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
import { IProfit } from './profit.model';
export declare function findOne(filter?: FilterQuery<IProfit>, projection?: ProjectionType<IProfit> | null, options?: QueryOptions<IProfit> | null): Promise<import("mongoose").Document<unknown, any, IProfit> & IProfit & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function find(filter?: FilterQuery<IProfit>, projection?: ProjectionType<IProfit> | null, options?: QueryOptions<IProfit> | null): Promise<(import("mongoose").Document<unknown, any, IProfit> & IProfit & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare function updateOne(filter: FilterQuery<IProfit>, update: UpdateQuery<IProfit> | UpdateWithAggregationPipeline, options?: QueryOptions<IProfit> | null): Promise<import("mongodb").UpdateResult>;
export declare function create(profit: IProfit): Promise<import("mongoose").Document<unknown, any, IProfit> & IProfit & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function pagination(page: number, perPage: number, filter?: FilterQuery<IProfit>, projection?: ProjectionType<IProfit> | null, options?: QueryOptions<IProfit> | null): Promise<import("../../utils").Pagination<import("mongoose").Document<any, any, any>>>;
//# sourceMappingURL=profit.service.d.ts.map