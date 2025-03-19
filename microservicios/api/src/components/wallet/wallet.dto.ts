import { Types } from 'mongoose';
import { WalletTC } from './wallet.model';

export const WalletTypeName = WalletTC.getTypeName();
export const WalletType = WalletTC.getType();
export const WalletTypePlural = WalletTC.getTypePlural().getTypeName();
export const WalletTypeNotNull = WalletTC.getTypeNonNull();

export type TCreateWalletInput = {
  name: string;
  address: string;
  currency: Types.ObjectId;
  owner: string;
};

export const CreateWalletInput = `
  input CreateWalletInput {
    name: String!
    address: String!
    currency: MongoID!
    owner: String
  }
`;
