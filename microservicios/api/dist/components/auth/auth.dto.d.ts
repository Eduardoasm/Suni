import { Types } from 'mongoose';
type TPermissionInput = {
    name: string;
    key: string;
    options: Array<string>;
};
export type TCreateUserInput = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dni: string;
    dniType: string;
    permissions?: Array<TPermissionInput>;
    userRole: string;
};
export declare const CreateUserInput = "\n  input CreateUser {\n    email: String!\n    password: String\n    firstName: String!\n    lastName: String\n    dni: String!\n    dniType: String!\n    permissions: [PermissionInput!]\n    userRole: String\n  }\n\n  input PermissionInput {\n    name: String\n    key: String\n    options: [String!]\n  }\n\n";
export type TSignUpInput = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dni: string;
    dniType: string;
    deviceToken?: string;
};
export declare const SignUpInput = "\n  input SignUpInput {\n    email: String\n    password: String\n    firstName: String\n    lastName: String\n    dni: String\n    dniType: String\n    deviceToken: String\n  }\n";
export type TSignInInput = {
    email: string;
    password: string;
    deviceToken?: string;
};
export declare const SignInInput = "\n  input SignInInput {\n    email: String!\n    password: String!\n    deviceToken: String\n  }\n";
export declare const SignInType: string;
export declare const CurrentUserRole: string;
export declare const SignOutType = "\n  type SignOutType {\n    success: Boolean!\n    message: String\n  }\n";
export type TResetPasswordInput = {
    email: string;
};
export declare const ResetPasswordInput = "\n  input ResetPasswordInput {\n    email: String!\n  }\n";
export declare const ResetPasswordInfo = "\n  type ResetPasswordInfo {\n    success: Boolean!\n    err: String\n  }\n";
export type TChangePasswordInput = {
    token: string;
    password: string;
};
export declare const ChangePasswordInput = "\n  input ChangePasswordInput {\n    token: String!\n    password: String!\n  }\n";
export type TPermissionAdminInput = {
    name: string;
    key: string;
    options: Array<string>;
};
export type TCreateAdminInput = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dni: string;
    permissions?: Array<TPermissionAdminInput>;
    dniType: string;
    userRole: string;
};
export declare const createAdminInput = "\n  input CreateAdmin {\n    email: String!\n    password: String!\n    firstName: String!\n    lastName: String\n    dni: String!\n    dniType: String!\n    permissions: [PermissionAdminInput!]\n    userRole: String\n  }\n\n  input PermissionAdminInput {\n    name: String\n    key: String\n    options: [String!]\n  }\n";
export type TAdminDeleteUserInput = {
    userId: Types.ObjectId;
};
export declare const AdminDeleteUserInput = "\n  input AdminDeleteUser {\n    userId: MongoID!\n  }\n";
export declare const DeleteResultType = "\n  type DeleteResultType {\n    success: Boolean\n  }\n";
export type TSignOutInput = {
    token?: string;
};
export declare const SignOutInput = "\n  input SignOutInput {\n    token: String\n  }\n";
export declare const UserWalletsType = "\n  type UserWalletsType {\n    userWallets: [WalletType]\n  }\n\n  type WalletType {\n    name: String\n    wallet: String\n    balance: Float\n    balanceInUSDC: Float\n    blockedBalance: Float\n    blockedBalanceInUSDC: Float\n    availableBalance: Float\n    availableBalanceInUSDC: Float\n    currency: String\n  }\n";
export declare const ValidateForKYCType = "\n  type ValidateForKYCType {\n    isAllowed: Boolean\n    message: String\n  }  \n";
export type TGetUserWalletInput = {
    currency: string;
};
export declare const GetUserWalletsInput = "\n  input getUserWallet {\n    currency: String\n  }\n";
export {};
//# sourceMappingURL=auth.dto.d.ts.map