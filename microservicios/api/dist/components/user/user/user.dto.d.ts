import { Types } from 'mongoose';
export declare const UserRole: string;
export declare const UserRolePlural: string;
export declare const UserRoleNotNull: string;
export type TUpdateUserWallet = {
    _id?: Types.ObjectId;
    wallet: Types.ObjectId;
};
export declare const UpdateUserWallet = "\n  input UpdateWalletUserCustom {\n    _id: MongoID!\n    wallet: MongoID!\n  }\n";
export declare const GetUserType = "\n  type GetUser {\n    id: String\n    email: String\n    name: String\n    lastName: String\n    phone: Int\n    code_reference: String\n    reset_status_pass: Boolean\n    created_at: Date\n    closed_at: String\n    country: String\n    metamapStatus: Metamap\n    agreedToDataCollection: Boolean\n  }\n\n  type Metamap {\n    id: String\n    status: String\n  }\n";
//# sourceMappingURL=user.dto.d.ts.map