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
import { IAsset } from './asset.model';
export declare function findOne(filter?: FilterQuery<IAsset>, projection?: ProjectionType<IAsset> | null, options?: QueryOptions<IAsset> | null): Promise<import("mongoose").Document<unknown, any, IAsset> & IAsset & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function find(filter?: FilterQuery<IAsset>, projection?: ProjectionType<IAsset> | null, options?: QueryOptions<IAsset> | null): Promise<(import("mongoose").Document<unknown, any, IAsset> & IAsset & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare function updateOne(filter: FilterQuery<IAsset>, update: UpdateQuery<IAsset> | UpdateWithAggregationPipeline, options?: QueryOptions<IAsset> | null): Promise<import("mongodb").UpdateResult>;
export declare function create(asset: IAsset): Promise<import("mongoose").Document<unknown, any, IAsset> & IAsset & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function pagination(page: number, perPage: number, filter?: FilterQuery<IAsset>, projection?: ProjectionType<IAsset> | null, options?: QueryOptions<IAsset> | null): Promise<import("../../utils").Pagination<import("mongoose").Document<any, any, any>>>;
export declare function getAssets(): Promise<any[]>;
//# sourceMappingURL=asset.service.d.ts.map