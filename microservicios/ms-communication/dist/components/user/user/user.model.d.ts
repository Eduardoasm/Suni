import { Document, Types, Model } from 'mongoose';
import { IPermission } from '../permissions';
import { ISession } from '../sessions';
export type UserRoleEnum = 'admin' | 'superadmin';
export type DniTypeEnum = 'V' | 'E' | 'J' | 'G' | 'P' | 'N/A';
export interface IUser {
    _id?: any;
    slug?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    permission: Array<IPermission>;
    userRole: UserRoleEnum;
    emailVerify?: boolean;
    resetTokenValidity?: Date;
    resetToken?: string;
    dni?: string;
    dniType?: DniTypeEnum;
    sessions?: Array<ISession>;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export type UserDocument = Document<Types.ObjectId, any, IUser> & IUser;
export declare const User: Model<UserDocument, {}, {}, {}, any> & {
    SyncToAlgolia?: any;
    SetAlgoliaSettings?: any;
};
export declare const UserTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<UserDocument, any>;
export declare const UserSwagger: any;
//# sourceMappingURL=user.model.d.ts.map