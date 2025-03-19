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
import { ICreditScore } from './creditScore.model';
import { TCreateCreditScore, TGetClientWithCreditScoreInput, TGetCreditScoreUser } from './creditScore.dto';
export declare function findOne(filter?: FilterQuery<ICreditScore>, projection?: ProjectionType<ICreditScore> | null, options?: QueryOptions<ICreditScore> | null): Promise<import("mongoose").Document<unknown, any, ICreditScore> & ICreditScore & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function find(filter?: FilterQuery<ICreditScore>, projection?: ProjectionType<ICreditScore> | null, options?: QueryOptions<ICreditScore> | null): Promise<(import("mongoose").Document<unknown, any, ICreditScore> & ICreditScore & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare function updateOne(filter: FilterQuery<ICreditScore>, update: UpdateQuery<ICreditScore> | UpdateWithAggregationPipeline, options?: QueryOptions<ICreditScore> | null): Promise<import("mongodb").UpdateResult>;
export declare function getClientWithCreditScore(body: TGetClientWithCreditScoreInput): Promise<any>;
export declare function getClientsWithCreditScore(filter?: FilterQuery<ICreditScore>): Promise<{
    clients: any[];
}>;
export declare function create(body: TCreateCreditScore, token: string, session?: any): Promise<(import("mongoose").Document<unknown, any, ICreditScore> & ICreditScore & {
    _id: import("mongoose").Types.ObjectId;
}) | (import("mongoose").Document<unknown, any, ICreditScore> & ICreditScore & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare function pagination(page: number, perPage: number, filter?: FilterQuery<ICreditScore>, projection?: ProjectionType<ICreditScore> | null, options?: QueryOptions<ICreditScore> | null): Promise<import("../../../utils").Pagination<import("mongoose").Document<any, any, any>>>;
export declare function getCreditScoreUser(body: TGetCreditScoreUser): Promise<any>;
export declare function getCredolabDataset(referenceNumber: string): Promise<any>;
//# sourceMappingURL=creditScore.service.d.ts.map