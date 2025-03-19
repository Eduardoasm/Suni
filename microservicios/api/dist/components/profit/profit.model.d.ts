import { Document, Types, Model } from 'mongoose';
import { IContract } from '../contract/contract';
export interface IProfit {
    _id?: any;
    contract: Types.ObjectId | IContract;
    amount: number;
    active: boolean;
}
export type ProfitDocument = Document<Types.ObjectId, any, IProfit> & IProfit;
export declare const Profit: Model<IProfit, {}, {}, {}, any>;
export declare const ProfitTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<ProfitDocument, any>;
//# sourceMappingURL=profit.model.d.ts.map