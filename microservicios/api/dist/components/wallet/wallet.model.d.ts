import { Document, Types, Model } from 'mongoose';
import { ICurrency } from '../currency';
export interface IWallet {
    _id?: any;
    name: string;
    address: string;
    currency: Types.ObjectId | ICurrency;
    owner: string;
    active?: boolean;
}
export type WalletDocument = Document<Types.ObjectId, any, IWallet> & IWallet;
export declare const Wallet: Model<IWallet, {}, {}, {}, any>;
export declare const WalletTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<WalletDocument, any>;
//# sourceMappingURL=wallet.model.d.ts.map