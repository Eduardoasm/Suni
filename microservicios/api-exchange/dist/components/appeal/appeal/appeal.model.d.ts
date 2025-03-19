import { Types, Document, Model } from 'mongoose';
import { ITransaction } from '../../transaction';
import { IMultimedia } from '../multimedia';
import { IUser } from '../../user/user.schema';
export type AppealStatusEnum = 'active' | 'canceled' | 'resolved';
export type AppealReasonEnum = 'confirmedNotReceived' | 'notConfirmed' | 'confirmedNotReleased';
export interface IAppeal {
    _id?: any;
    transaction: Types.ObjectId | ITransaction;
    description: string;
    paymentReceipt?: Array<IMultimedia>;
    reason: AppealReasonEnum;
    finalResultDescription?: string;
    status: AppealStatusEnum;
    appealOwner: IUser;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export type AppealDocument = Document<Types.ObjectId, any, IAppeal> & IAppeal;
export declare const Appeal: Model<IAppeal, {}, {}, {}, any>;
export declare const AppealTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<AppealDocument, any>;
//# sourceMappingURL=appeal.model.d.ts.map