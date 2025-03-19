import { Types, model, Document, Model, Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import {
  IPaymentMethodValue,
  PaymentMethodValueTC,
} from '../paymentMethodValue';
import {
  IPaymentMethodCategory,
  PaymentMethodCategoryTC,
} from '../paymentMethodCategory';
import { IUser, userSchema } from '../user/user.schema';

export interface IPaymentMethod {
  _id?: any;
  type: Types.ObjectId | IPaymentMethodCategory;
  values: Array<Types.ObjectId | IPaymentMethodValue>;
  requiredInfo?: Array<string>;
  user: IUser;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PaymentMethodDocument = Document<
  Types.ObjectId,
  any,
  IPaymentMethod
> &
  IPaymentMethod;

const PaymentMethodSchema = new Schema<IPaymentMethod>(
  {
    values: [
      {
        type: Schema.Types.ObjectId,
        ref: 'PaymentMethodValue',
      },
    ],
    type: {
      type: Schema.Types.ObjectId,
      ref: 'PaymentMethodCategory',
    },
    requiredInfo: [
      {
        type: String,
        trim: true,
      },
    ],
    user: {
      type: userSchema,
      required: [true, 'Por favor inserta un user'],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const PaymentMethod = model<IPaymentMethod, Model<IPaymentMethod>>(
  'PaymentMethod',
  PaymentMethodSchema
);

export const PaymentMethodTC = composeMongoose<PaymentMethodDocument>(
  PaymentMethod as any
);

PaymentMethodTC.addRelation('values', {
  resolver: () => PaymentMethodValueTC.mongooseResolvers.dataLoaderMany(),
  prepareArgs: {
    _ids: (source) => source.values,
  },
  projection: { values: 1 },
});

PaymentMethodTC.addRelation('type', {
  resolver: () =>
    PaymentMethodCategoryTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.type,
  },
  projection: { type: 1 },
});
