import { Types, model, Document, Model, Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { ITransaction, TransactionTC } from '../../transaction';
import { IMultimedia, multimediaSchema } from '../multimedia';
import { IUser, userSchema } from '../../user/user.schema';

export type AppealStatusEnum = 'active' | 'canceled' | 'resolved';

export type AppealReasonEnum =
  | 'confirmedNotReceived'
  | 'notConfirmed'
  | 'confirmedNotReleased';

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

const appealSchema = new Schema<IAppeal>(
  {
    transaction: {
      type: Schema.Types.ObjectId,
      ref: 'Transaction',
    },
    description: {
      type: String,
      required: [true, 'Por favor ingrese la descripcion'],
    },
    paymentReceipt: [multimediaSchema],
    reason: {
      type: String,
      required: [true, 'Por favor ingrese el motivo de la apelación'],
      enum: ['confirmedNotReceived', 'notConfirmed', 'confirmedNotReleased'],
      default: 'confirmedNotReceived',
    },
    finalResultDescription: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'canceled', 'resolved'],
    },
    active: {
      type: Boolean,
      default: true,
    },
    appealOwner: {
      type: userSchema,
      required: [true, 'Por favor insertar el usuario que apeló'],
    },
  },
  { timestamps: true }
);

export const Appeal = model<IAppeal, Model<IAppeal>>('Appeal', appealSchema);

export const AppealTC = composeMongoose<AppealDocument>(Appeal as any);

AppealTC.addRelation('transaction', {
  resolver: () => TransactionTC.mongooseResolvers.dataLoader(),
  prepareArgs: {
    _id: (source) => source.transaction,
  },
  projection: { transaction: 1 },
});
