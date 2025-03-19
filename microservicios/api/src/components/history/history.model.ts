import { Schema, Document, Types, Model, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { IUser, UserTC } from '../user/user';

export type CollectionNameEnum =
  | 'user'
  | 'creditScore'
  | 'loan'
  | 'contract'
  | 'paymentPlan';

export interface IHistory {
  _id?: any;
  user: Types.ObjectId | IUser;
  description: string;
  collectionName: CollectionNameEnum;
  document: Types.ObjectId;
  active: boolean;
}

export type HistoryDocument = Document<Types.ObjectId, any, IHistory> &
  IHistory;

const historySchema = new Schema<IHistory>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    description: {
      type: String,
      trim: true,
    },
    collectionName: {
      type: String,
      enum: ['user', 'creditScore', 'loan', 'contract', 'paymentPlan'],
      // required: [true, 'Nombre de la colección en donde ocurrió la actividad'],
    },
    document: {
      type: Schema.Types.ObjectId,
      required: [true, '_id del documento que generó la actividad'],
    },
    active: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const History = model<IHistory, Model<IHistory>>(
  'History',
  historySchema
);

export const HistoryTC = composeMongoose<HistoryDocument>(History as any);

HistoryTC.addRelation('user', {
  resolver: () => UserTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.user,
  },
  projection: { user: 1 },
});
