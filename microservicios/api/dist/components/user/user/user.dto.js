"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserType = exports.UpdateUserWallet = exports.UserRoleNotNull = exports.UserRolePlural = exports.UserRole = void 0;
const user_model_1 = require("./user.model");
exports.UserRole = user_model_1.UserTC.getTypeName();
exports.UserRolePlural = user_model_1.UserTC.getTypePlural().getTypeName();
exports.UserRoleNotNull = user_model_1.UserTC.getTypeNonNull().getTypeName();
exports.UpdateUserWallet = `
  input UpdateWalletUserCustom {
    _id: MongoID!
    wallet: MongoID!
  }
`;
exports.GetUserType = `
  type GetUser {
    id: String
    email: String
    name: String
    lastName: String
    phone: Int
    code_reference: String
    reset_status_pass: Boolean
    created_at: Date
    closed_at: String
    country: String
    metamapStatus: Metamap
    agreedToDataCollection: Boolean
  }

  type Metamap {
    id: String
    status: String
  }
`;
//# sourceMappingURL=user.dto.js.map