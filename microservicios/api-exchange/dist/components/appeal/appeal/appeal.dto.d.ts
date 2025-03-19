import { Types } from 'mongoose';
import { AppealReasonEnum } from './appeal.model';
import { IMultimedia } from '../multimedia';
export declare const AppealTypeName: string;
export declare const AppealType: import("graphql").GraphQLObjectType<any, any>;
export declare const AppealTypePlural: string;
export declare const AppealTypeNonNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./appeal.model").AppealDocument, any>>;
export type TCreateAppeal = {
    transaction: Types.ObjectId;
    description: string;
    paymentReceipt: Array<IMultimedia>;
    reason: AppealReasonEnum;
};
export declare const CreateAppealInput = "\n  input CreateAppeal {\n    transaction: MongoID!\n    description: String!\n    paymentReceipt: [MultimediaInput]\n    reason: String!\n  }\n\n  input MultimediaInput {\n    src: String\n    alt: String\n    type: String\n  }\n";
export type TCancelAppeal = {
    transactionId: Types.ObjectId;
};
export declare const CancelAppealInput = "\n  input CancelAppeal {\n    transactionId: MongoID!\n  }\n";
//# sourceMappingURL=appeal.dto.d.ts.map