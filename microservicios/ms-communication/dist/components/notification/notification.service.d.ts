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
import { INotification } from './notification.model';
import { TGetNotifications, TReadNotification, TDeleteNotification, TCreateNotification, TCustomNotification } from './notification.dto';
export declare function findOne(filter?: FilterQuery<INotification>, projection?: ProjectionType<INotification> | null, options?: QueryOptions<INotification> | null): Promise<import("mongoose").Document<unknown, any, INotification> & INotification & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function find(filter?: FilterQuery<INotification>, projection?: ProjectionType<INotification> | null, options?: QueryOptions<INotification> | null): Promise<(import("mongoose").Document<unknown, any, INotification> & INotification & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare function updateOne(filter: FilterQuery<INotification>, update: UpdateQuery<INotification> | UpdateWithAggregationPipeline, options?: QueryOptions<INotification> | null): Promise<import("mongodb").UpdateResult>;
export declare function create(notification: INotification): Promise<import("mongoose").Document<unknown, any, INotification> & INotification & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function pagination(page: number, perPage: number, filter?: FilterQuery<INotification>, projection?: ProjectionType<INotification> | null, options?: QueryOptions<INotification> | null): Promise<import("../../utils").Pagination<import("mongoose").Document<any, any, any>>>;
export declare function getNotifications(body: TGetNotifications, token: string): Promise<import("../../utils").Pagination<import("mongoose").Document<any, any, any>>>;
export declare function softDeleteNotification(body: TDeleteNotification, token: string): Promise<import("mongoose").Document<unknown, any, INotification> & INotification & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function readNotification(body: TReadNotification, token: string): Promise<import("mongoose").Document<unknown, any, INotification> & INotification & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function readManyNotifications(token: string): Promise<boolean>;
export declare function customCreateNotification(body: TCreateNotification, token: string): Promise<import("mongoose").Document<unknown, any, INotification> & INotification & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function customFindOne(body: TCustomNotification, token: string): Promise<{
    notification: any;
    relationObject: any;
}>;
export declare function unreadNotification(body: TReadNotification, token: string): Promise<import("mongoose").Document<unknown, any, INotification> & INotification & {
    _id: import("mongoose").Types.ObjectId;
}>;
//# sourceMappingURL=notification.service.d.ts.map