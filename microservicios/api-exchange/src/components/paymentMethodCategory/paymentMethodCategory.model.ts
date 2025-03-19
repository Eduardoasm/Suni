import { Types, model, Document, Model, Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import {
  IPaymentMethodInput,
  PaymentMethodInputTC,
} from '../paymentMethodInput/paymentMethodInput';
import { CurrencyTC, ICurrency } from '../currency';

export interface IPaymentMethodCategory {
  _id?: any;
  name: string;
  paymentMethodInputs: Array<Types.ObjectId | IPaymentMethodInput>;
  currency: Types.ObjectId | ICurrency;
  selected: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type PaymentMethodCategoryDocument = Document<
  Types.ObjectId,
  any,
  IPaymentMethodCategory
> &
  IPaymentMethodCategory;

const PaymentMethodCategorySchema = new Schema<IPaymentMethodCategory>(
  {
    name: {
      type: String,
      required: [true, 'Ingresa un nombre'],
      trim: true,
    },
    paymentMethodInputs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'PaymentMethodInput',
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    selected: {
      type: Boolean,
      default: true,
    },
    currency: {
      type: Schema.Types.ObjectId,
      ref: 'Currency',
    },
  },
  { timestamps: true }
);

export const PaymentMethodCategory = model<
  IPaymentMethodCategory,
  Model<IPaymentMethodCategory>
>('PaymentMethodCategory', PaymentMethodCategorySchema);

export const PaymentMethodCategoryTC =
  composeMongoose<PaymentMethodCategoryDocument>(PaymentMethodCategory as any);

PaymentMethodCategoryTC.addRelation('paymentMethodInputs', {
  resolver: () => PaymentMethodInputTC.mongooseResolvers.dataLoaderMany(),
  prepareArgs: {
    _ids: (source) => source.paymentMethodInputs,
  },
  projection: { paymentMethodInputs: 1 },
});

PaymentMethodCategoryTC.addRelation('currency', {
  resolver: () => CurrencyTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.currency,
  },
  projection: { currency: 1 },
});
