import { Types } from 'mongoose';
import { UserTC } from './user.model';

export const UserRole = UserTC.getTypeName();
export const UserRolePlural = UserTC.getTypePlural().getTypeName();
export const UserRoleNotNull = UserTC.getTypeNonNull().getTypeName();

export type TUpdateUserWallet = {
  _id?: Types.ObjectId;
  wallet: Types.ObjectId;
};

export const UpdateUserWallet = `
  input UpdateWalletUserCustom {
    _id: MongoID!
    wallet: MongoID!
  }
`;

export const GetUserType = `
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
