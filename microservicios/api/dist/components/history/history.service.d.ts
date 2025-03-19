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
import { IHistory } from './history.model';
export declare function findOne(filter?: FilterQuery<IHistory>, projection?: ProjectionType<IHistory> | null, options?: QueryOptions<IHistory> | null): Promise<import("mongoose").Document<unknown, any, IHistory> & IHistory & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function find(filter?: FilterQuery<IHistory>, projection?: ProjectionType<IHistory> | null, options?: QueryOptions<IHistory> | null): Promise<(import("mongoose").Document<unknown, any, IHistory> & IHistory & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare function updateOne(filter: FilterQuery<IHistory>, update: UpdateQuery<IHistory> | UpdateWithAggregationPipeline, options?: QueryOptions<IHistory> | null): Promise<import("mongodb").UpdateResult>;
export declare function create(history: IHistory): Promise<import("mongoose").Document<unknown, any, IHistory> & IHistory & {
    _id: import("mongoose").Types.ObjectId;
}>;
//# sourceMappingURL=history.service.d.ts.map