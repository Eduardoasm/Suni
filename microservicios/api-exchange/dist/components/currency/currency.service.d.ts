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
import { ICurrency } from './currency.model';
import { TGetAssetWallets } from './currency.dto';
export declare function findOne(filter?: FilterQuery<ICurrency>, projection?: ProjectionType<ICurrency> | null, options?: QueryOptions<ICurrency> | null): Promise<import("mongoose").Document<unknown, any, ICurrency> & ICurrency & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function find(filter?: FilterQuery<ICurrency>, projection?: ProjectionType<ICurrency> | null, options?: QueryOptions<ICurrency> | null): Promise<(import("mongoose").Document<unknown, any, ICurrency> & ICurrency & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare function updateOne(filter: FilterQuery<ICurrency>, update: UpdateQuery<ICurrency> | UpdateWithAggregationPipeline, options?: QueryOptions<ICurrency> | null): Promise<import("mongodb").UpdateResult>;
export declare function create(currency: ICurrency): Promise<import("mongoose").Document<unknown, any, ICurrency> & ICurrency & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function pagination(page: number, perPage: number, filter?: FilterQuery<ICurrency>, projection?: ProjectionType<ICurrency> | null, options?: QueryOptions<ICurrency> | null): Promise<import("../../utils").Pagination<import("mongoose").Document<any, any, any>>>;
interface IWallet {
    wallet: string;
    name: string;
    balance: number;
    error: string | null;
    business_enabled: string | null;
    type: string;
    blocked_balance: number;
    available_balance: number;
}
export declare function getUserWallets(token: string): Promise<IWallet[]>;
export declare function getUserAssetWallets(body: TGetAssetWallets, token: string): Promise<IWallet[]>;
export {};
//# sourceMappingURL=currency.service.d.ts.map