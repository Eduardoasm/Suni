import { Types, model, Document, Model, Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import {
  IPaymentMethodInput,
  PaymentMethodInputTC,
} from '../paymentMethodInput/paymentMethodInput';

export interface IPaymentMethodValue {
  _id?: any;
  value: string;
  paymentMethodInput?: Types.ObjectId | IPaymentMethodInput;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PaymentMethodValueDocument = Document<
  Types.ObjectId,
  any,
  IPaymentMethodValue
> &
  IPaymentMethodValue;

const PaymentMethodValueSchema = new Schema<IPaymentMethodValue>(
  {
    value: {
      type: String,
      required: [true, 'Ingresa un valor'],
      trim: true,
    },
    paymentMethodInput: {
      type: Schema.Types.ObjectId,
      ref: 'PaymentMethodInput',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const PaymentMethodValue = model<
  IPaymentMethodValue,
  Model<IPaymentMethodValue>
>('PaymentMethodValue', PaymentMethodValueSchema);

export const PaymentMethodValueTC = composeMongoose<PaymentMethodValueDocument>(
  PaymentMethodValue as any
);

PaymentMethodValueTC.addRelation('paymentMethodInput', {
  resolver: () =>
    PaymentMethodInputTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.paymentMethodInput,
  },
  projection: { paymentMethodInput: 1 },
});
