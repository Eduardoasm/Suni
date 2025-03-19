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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { BrowserDetectInfo } from '../../types/browser';
import { TAdminDeleteUserInput, TChangePasswordInput, TCreateAdminInput, TGetUserWalletInput, TSignInInput } from './auth.dto';
export declare function createAdmin(body: TCreateAdminInput, token: string, _browser?: BrowserDetectInfo | null): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, any, import("../user/user").IUser> & import("../user/user").IUser & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare function signIn(body: TSignInInput, _browser?: BrowserDetectInfo | null): Promise<{
    user: import("mongoose").Document<import("mongoose").Types.ObjectId, any, import("../user/user").IUser> & import("../user/user").IUser & {
        _id: import("mongoose").Types.ObjectId;
    };
    token: string;
}>;
export declare function signOut(token: string): Promise<{
    success: boolean;
    message?: undefined;
} | {
    success: boolean;
    message: string;
}>;
export declare function currentUser(token: string): Promise<{
    user: import("mongoose").Document<import("mongoose").Types.ObjectId, any, import("../user/user").IUser> & import("../user/user").IUser & {
        _id: import("mongoose").Types.ObjectId;
    };
}>;
export declare function resetPassword(email: string, browserData: BrowserDetectInfo): Promise<void>;
export declare function changePassword(data: TChangePasswordInput): Promise<void>;
export declare function signInAdmin(body: TSignInInput, _browser?: BrowserDetectInfo | null): Promise<{
    user: import("mongoose").Document<import("mongoose").Types.ObjectId, any, import("../user/user").IUser> & import("../user/user").IUser & {
        _id: import("mongoose").Types.ObjectId;
    };
    token: string;
}>;
export declare function deleteUser(token: string): Promise<boolean>;
export declare function adminDeleteUser(body: TAdminDeleteUserInput, token: string): Promise<boolean>;
export declare function getUserWallets(token: string, body: TGetUserWalletInput): Promise<{
    userWallets: any;
}>;
export declare function validateForKYC(token: string): Promise<{
    isAllowed: boolean;
    message: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map