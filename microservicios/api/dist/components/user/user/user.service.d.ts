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
import type { FilterQuery, ProjectionType, QueryOptions, UpdateQuery } from 'mongoose';
import { DniTypeEnum, IUser, UserRoleEnum } from './user.model';
export declare function findOne(filter?: FilterQuery<IUser>, projection?: ProjectionType<IUser> | null, options?: QueryOptions<IUser> | null): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, any, IUser> & IUser & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function find(filter?: FilterQuery<IUser>, projection?: ProjectionType<IUser> | null, options?: QueryOptions<IUser> | null): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, any, IUser> & IUser & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare function updateOne(filter: FilterQuery<IUser>, update: UpdateQuery<IUser>, options?: QueryOptions<IUser> | null): Promise<import("mongodb").UpdateResult>;
export declare function create(user: IUser): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, any, IUser> & IUser & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function translateDniType(candidate: string): DniTypeEnum;
export declare function translateUserRole(candidate: string): UserRoleEnum;
export declare function pagination(page: number, perPage: number, filter?: FilterQuery<IUser>, projection?: ProjectionType<IUser> | null, options?: QueryOptions<IUser> | null): Promise<import("../../../utils").Pagination<import("mongoose").Document<any, any, any>>>;
export declare function getUser(token: string): Promise<any>;
export declare function getWAOClient(clientId: string): Promise<import("axios").AxiosResponse<any, any>>;
//# sourceMappingURL=user.service.d.ts.map