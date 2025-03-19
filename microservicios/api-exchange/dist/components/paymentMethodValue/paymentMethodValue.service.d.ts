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
import { IPaymentMethodValue } from './paymentMethodValue.model';
import { TUpdatesManyValues } from './paymentMethodValue.dto';
export declare function findOne(filter?: FilterQuery<IPaymentMethodValue>, projection?: ProjectionType<IPaymentMethodValue> | null, options?: QueryOptions<IPaymentMethodValue> | null): Promise<import("mongoose").Document<unknown, any, IPaymentMethodValue> & IPaymentMethodValue & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function find(filter?: FilterQuery<IPaymentMethodValue>, projection?: ProjectionType<IPaymentMethodValue> | null, options?: QueryOptions<IPaymentMethodValue> | null): Promise<(import("mongoose").Document<unknown, any, IPaymentMethodValue> & IPaymentMethodValue & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare function updateOne(filter: FilterQuery<IPaymentMethodValue>, update: UpdateQuery<IPaymentMethodValue> | UpdateWithAggregationPipeline, options?: QueryOptions<IPaymentMethodValue> | null): Promise<import("mongodb").UpdateResult>;
export declare function create(paymentMethodValue: IPaymentMethodValue): Promise<import("mongoose").Document<unknown, any, IPaymentMethodValue> & IPaymentMethodValue & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function pagination(page: number, perPage: number, filter?: FilterQuery<IPaymentMethodValue>, projection?: ProjectionType<IPaymentMethodValue> | null, options?: QueryOptions<IPaymentMethodValue> | null): Promise<import("../../utils").Pagination<import("mongoose").Document<any, any, any>>>;
export declare function insertMany(body: IPaymentMethodValue[]): Promise<(import("mongoose").Document<unknown, any, import("mongoose").MergeType<import("mongoose").MergeType<IPaymentMethodValue, IPaymentMethodValue>, IPaymentMethodValue & {
    _id: import("mongoose").Types.ObjectId;
}>> & Omit<import("mongoose").MergeType<IPaymentMethodValue, IPaymentMethodValue>, keyof IPaymentMethodValue> & IPaymentMethodValue & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare function updateMany(filter: FilterQuery<IPaymentMethodValue>, update: UpdateQuery<IPaymentMethodValue> | UpdateWithAggregationPipeline, options?: QueryOptions<IPaymentMethodValue> | null): Promise<import("mongodb").UpdateResult>;
export declare function updateManyValuesUser(body: TUpdatesManyValues): Promise<boolean>;
//# sourceMappingURL=paymentMethodValue.service.d.ts.map