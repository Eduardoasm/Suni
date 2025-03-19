import { Types } from 'mongoose';
import { CurrencyTC } from './currency.model';

export const CurrencyTypeName = CurrencyTC.getTypeName();
export const CurrencyType = CurrencyTC.getType();
export const CurrencyTypePlural = CurrencyTC.getTypePlural().getTypeName();
export const CurrencyTypeNonNull = CurrencyTC.getTypeNonNull();

export const userWalletsType = `
  type userWallets {
    wallets: [properties]
  }

  type properties {
    wallet: String
    name: String
    balance: Float
    error: String
    blocked_balance: Float
    available_balance: Float
  }
`;

export type TGetAssetWallets = {
  asset: Types.ObjectId;
};

export const GetAssetWalletsInput = `
  input GetAssetWallets {
    asset: MongoID!
  }
`;
