import { Document, Types, Model } from 'mongoose';
import { IUser } from '../user/user';
export type CollectionNameEnum = 'user' | 'creditScore' | 'loan' | 'contract' | 'paymentPlan';
export interface IHistory {
    _id?: any;
    user: Types.ObjectId | IUser;
    description: string;
    collectionName: CollectionNameEnum;
    document: Types.ObjectId;
    active: boolean;
}
export type HistoryDocument = Document<Types.ObjectId, any, IHistory> & IHistory;
export declare const History: Model<IHistory, {}, {}, {}, any>;
export declare const HistoryTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<HistoryDocument, any>;
//# sourceMappingURL=history.model.d.ts.map