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
import { TUpdateInternalCreditScoreValueInput, TUpdateSettingsCreditScoreParamsInput, TUpdateSettings } from './settings.dto';
import { ISettings as ISetting } from './settings.model';
export declare function findOne(filter?: FilterQuery<ISetting>, projection?: ProjectionType<ISetting> | null, options?: QueryOptions<ISetting> | null): Promise<import("mongoose").Document<unknown, any, ISetting> & ISetting & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function find(filter?: FilterQuery<ISetting>, projection?: ProjectionType<ISetting> | null, options?: QueryOptions<ISetting> | null): Promise<(import("mongoose").Document<unknown, any, ISetting> & ISetting & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare function updateOne(filter: FilterQuery<ISetting>, update: UpdateQuery<ISetting> | UpdateWithAggregationPipeline, options?: QueryOptions<ISetting> | null): Promise<import("mongodb").UpdateResult>;
export declare function create(settings: ISetting): Promise<import("mongoose").Document<unknown, any, ISetting> & ISetting & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function updateSettingsCreditScoreParams(body: TUpdateSettingsCreditScoreParamsInput): Promise<import("mongoose").Document<unknown, any, ISetting> & ISetting & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function updateInternalCreditScoreValue(body: TUpdateInternalCreditScoreValueInput): Promise<import("mongoose").Document<unknown, any, ISetting> & ISetting & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function pagination(page: number, perPage: number, filter?: FilterQuery<ISetting>, projection?: ProjectionType<ISetting> | null, options?: QueryOptions<ISetting> | null): Promise<import("../../../utils").Pagination<import("mongoose").Document<any, any, any>>>;
export declare function updateSettings(body: TUpdateSettings, token: string): Promise<import("mongoose").Document<unknown, any, ISetting> & ISetting & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function getActiveSetting(): Promise<import("mongoose").Document<unknown, any, ISetting> & ISetting & {
    _id: import("mongoose").Types.ObjectId;
}>;
//# sourceMappingURL=settings.service.d.ts.map