"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserWalletsInput = exports.ValidateForKYCType = exports.UserWalletsType = exports.SignOutInput = exports.DeleteResultType = exports.AdminDeleteUserInput = exports.createAdminInput = exports.ChangePasswordInput = exports.ResetPasswordInfo = exports.ResetPasswordInput = exports.SignOutType = exports.CurrentUserRole = exports.SignInType = exports.SignInInput = exports.SignUpInput = exports.CreateUserInput = void 0;
const user_dto_1 = require("../user/user/user.dto");
exports.CreateUserInput = `
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
exports.SignUpInput = `
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
exports.SignInInput = `
  input SignInInput {
    email: String!
    password: String!
    deviceToken: String
  }
`;
exports.SignInType = `
  type SignInType {
    user: ${user_dto_1.UserRole}
    token: String
  }
`;
exports.CurrentUserRole = `
  type CurrentUserRole {
    user: ${user_dto_1.UserRole}
  }
`;
exports.SignOutType = `
  type SignOutType {
    success: Boolean!
    message: String
  }
`;
exports.ResetPasswordInput = `
  input ResetPasswordInput {
    email: String!
  }
`;
exports.ResetPasswordInfo = `
  type ResetPasswordInfo {
    success: Boolean!
    err: String
  }
`;
exports.ChangePasswordInput = `
  input ChangePasswordInput {
    token: String!
    password: String!
  }
`;
exports.createAdminInput = `
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
exports.AdminDeleteUserInput = `
  input AdminDeleteUser {
    userId: MongoID!
  }
`;
exports.DeleteResultType = `
  type DeleteResultType {
    success: Boolean
  }
`;
exports.SignOutInput = `
  input SignOutInput {
    token: String
  }
`;
exports.UserWalletsType = `
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
exports.ValidateForKYCType = `
  type ValidateForKYCType {
    isAllowed: Boolean
    message: String
  }  
`;
exports.GetUserWalletsInput = `
  input getUserWallet {
    currency: String
  }
`;
//# sourceMappingURL=auth.dto.js.map