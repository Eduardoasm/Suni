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
import { IBestPrice } from './bestPrice.model';
import { TGetBestPrice } from './bestPrice.dto';
export declare function findOne(filter?: FilterQuery<IBestPrice>, projection?: ProjectionType<IBestPrice> | null, options?: QueryOptions<IBestPrice> | null): Promise<import("mongoose").Document<unknown, any, IBestPrice> & IBestPrice & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function find(filter?: FilterQuery<IBestPrice>, projection?: ProjectionType<IBestPrice> | null, options?: QueryOptions<IBestPrice> | null): Promise<(import("mongoose").Document<unknown, any, IBestPrice> & IBestPrice & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare function updateOne(filter: FilterQuery<IBestPrice>, update: UpdateQuery<IBestPrice> | UpdateWithAggregationPipeline, options?: QueryOptions<IBestPrice> | null): Promise<import("mongodb").UpdateResult>;
export declare function create(bestPrice: IBestPrice): Promise<import("mongoose").Document<unknown, any, IBestPrice> & IBestPrice & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function pagination(page: number, perPage: number, filter?: FilterQuery<IBestPrice>, projection?: ProjectionType<IBestPrice> | null, options?: QueryOptions<IBestPrice> | null): Promise<import("../../utils").Pagination<import("mongoose").Document<any, any, any>>>;
export declare function getBestPrice(body: TGetBestPrice): Promise<import("mongoose").Document<unknown, any, IBestPrice> & IBestPrice & {
    _id: import("mongoose").Types.ObjectId;
}>;
//# sourceMappingURL=bestPrice.service.d.ts.map