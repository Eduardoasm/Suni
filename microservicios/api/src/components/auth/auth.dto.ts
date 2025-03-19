import { Types } from 'mongoose';
import { UserRole } from '../user/user/user.dto';

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

export const CreateUserInput = `
  input CreateUser {
    email: String!
    password: String
    firstName: String!
    lastName: String
    dni: String!
    dniType: String!
    permissions: [PermissionInput!]
    userRole: String
  }

  input PermissionInput {
    name: String
    key: String
    options: [String!]
  }

`;

export type TSignUpInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dni: string;
  dniType: string;
  deviceToken?: string;
};

export const SignUpInput = `
  input SignUpInput {
    email: String
    password: String
    firstName: String
    lastName: String
    dni: String
    dniType: String
    deviceToken: String
  }
`;

export type TSignInInput = {
  email: string;
  password: string;
  deviceToken?: string;
};

export const SignInInput = `
  input SignInInput {
    email: String!
    password: String!
    deviceToken: String
  }
`;

export const SignInType = `
  type SignInType {
    user: ${UserRole}
    token: String
  }
`;

export const CurrentUserRole = `
  type CurrentUserRole {
    user: ${UserRole}
  }
`;

export const SignOutType = `
  type SignOutType {
    success: Boolean!
    message: String
  }
`;

export type TResetPasswordInput = {
  email: string;
};

export const ResetPasswordInput = `
  input ResetPasswordInput {
    email: String!
  }
`;

export const ResetPasswordInfo = `
  type ResetPasswordInfo {
    success: Boolean!
    err: String
  }
`;

export type TChangePasswordInput = {
  token: string;
  password: string;
};

export const ChangePasswordInput = `
  input ChangePasswordInput {
    token: String!
    password: String!
  }
`;

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

export const createAdminInput = `
  input CreateAdmin {
    email: String!
    password: String!
    firstName: String!
    lastName: String
    dni: String!
    dniType: String!
    permissions: [PermissionAdminInput!]
    userRole: String
  }

  input PermissionAdminInput {
    name: String
    key: String
    options: [String!]
  }
`;

export type TAdminDeleteUserInput = {
  userId: Types.ObjectId;
};

export const AdminDeleteUserInput = `
  input AdminDeleteUser {
    userId: MongoID!
  }
`;

export const DeleteResultType = `
  type DeleteResultType {
    success: Boolean
  }
`;

export type TSignOutInput = {
  token?: string;
};
export const SignOutInput = `
  input SignOutInput {
    token: String
  }
`;

export const UserWalletsType = `
  type UserWalletsType {
    userWallets: [WalletType]
  }

  type WalletType {
    name: String
    wallet: String
    balance: Float
    balanceInUSDC: Float
    blockedBalance: Float
    blockedBalanceInUSDC: Float
    availableBalance: Float
    availableBalanceInUSDC: Float
    currency: String
  }
`;

export const ValidateForKYCType = `
  type ValidateForKYCType {
    isAllowed: Boolean
    message: String
  }  
`;

export type TGetUserWalletInput = {
  currency: string;
};

export const GetUserWalletsInput = `
  input getUserWallet {
    currency: String
  }
`;
