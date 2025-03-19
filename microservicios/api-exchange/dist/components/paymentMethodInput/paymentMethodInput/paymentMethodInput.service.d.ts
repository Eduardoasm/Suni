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
import { IPaymentMethodInput, PaymentMethodInputDocument } from './paymentMethodInput.model';
export declare function findOne(filter?: FilterQuery<IPaymentMethodInput>, projection?: ProjectionType<IPaymentMethodInput> | null, options?: QueryOptions<IPaymentMethodInput> | null): Promise<import("mongoose").Document<unknown, any, IPaymentMethodInput> & IPaymentMethodInput & Required<{
    _id: string;
}>>;
export declare function find(filter?: FilterQuery<IPaymentMethodInput>, projection?: ProjectionType<IPaymentMethodInput> | null, options?: QueryOptions<IPaymentMethodInput> | null): Promise<(import("mongoose").Document<unknown, any, IPaymentMethodInput> & IPaymentMethodInput & Required<{
    _id: string;
}>)[]>;
export declare function updateOne(filter: FilterQuery<IPaymentMethodInput>, update: UpdateQuery<IPaymentMethodInput> | UpdateWithAggregationPipeline, options?: QueryOptions<IPaymentMethodInput> | null): Promise<import("mongodb").UpdateResult>;
export declare function create(paymentMethodInput: PaymentMethodInputDocument): Promise<import("mongoose").Document<unknown, any, IPaymentMethodInput> & IPaymentMethodInput & Required<{
    _id: string;
}>>;
export declare function pagination(page: number, perPage: number, filter?: FilterQuery<IPaymentMethodInput>, projection?: ProjectionType<IPaymentMethodInput> | null, options?: QueryOptions<IPaymentMethodInput> | null): Promise<import("../../../utils").Pagination<import("mongoose").Document<any, any, any>>>;
//# sourceMappingURL=paymentMethodInput.service.d.ts.map