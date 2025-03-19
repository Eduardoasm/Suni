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
import type { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';
import { IPaymentMethodCategory, PaymentMethodCategoryDocument } from './paymentMethodCategory.model';
import { TGetPaymentMethodCategory } from './paymentMethodCategory.dto';
export declare function findOne(filter?: FilterQuery<IPaymentMethodCategory>, projection?: ProjectionType<IPaymentMethodCategory> | null, options?: QueryOptions<IPaymentMethodCategory> | null): Promise<import("mongoose").Document<unknown, any, IPaymentMethodCategory> & IPaymentMethodCategory & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function find(filter?: FilterQuery<IPaymentMethodCategory>, projection?: ProjectionType<IPaymentMethodCategory> | null, options?: QueryOptions<IPaymentMethodCategory> | null): Promise<(import("mongoose").Document<unknown, any, IPaymentMethodCategory> & IPaymentMethodCategory & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare function findPaymentMethodWithCurrency(filter?: FilterQuery<IPaymentMethodCategory>, projection?: ProjectionType<IPaymentMethodCategory> | null, options?: QueryOptions<IPaymentMethodCategory> | null): Promise<Omit<import("mongoose").Document<unknown, any, IPaymentMethodCategory> & IPaymentMethodCategory & {
    _id: import("mongoose").Types.ObjectId;
}, never>[]>;
export declare function updateOne(paymentMethodCategory: IPaymentMethodCategory): Promise<import("mongodb").UpdateResult>;
export declare function create(paymentMethodCategory: IPaymentMethodCategory): Promise<import("mongoose").Document<unknown, any, IPaymentMethodCategory> & IPaymentMethodCategory & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function updateMany(paymentMethodCategories: PaymentMethodCategoryDocument[]): Promise<any[]>;
export declare function deleteOne(paymentMethodCategoryId: string): Promise<import("mongodb").UpdateResult>;
export declare function pagination(page: number, perPage: number, filter?: FilterQuery<IPaymentMethodCategory>, projection?: ProjectionType<IPaymentMethodCategory> | null, options?: QueryOptions<IPaymentMethodCategory> | null): Promise<import("../../utils").Pagination<import("mongoose").Document<any, any, any>>>;
export declare function getPaymentMethodCategory(body: TGetPaymentMethodCategory, token: string): Promise<(import("mongoose").Document<unknown, any, IPaymentMethodCategory> & IPaymentMethodCategory & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
//# sourceMappingURL=paymentMethodCategory.service.d.ts.map