import { Types, model, Document, Model, Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { IOptions, optionsSchema } from '../options';

export type PaymentMethodInputTypeEnum =
  | 'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'phone'
  | 'email'
  | 'select';

export interface IPaymentMethodInput {
  _id?: string;
  name: string;
  placeholder: string;
  type: PaymentMethodInputTypeEnum;
  options?: Array<IOptions>;
  requested: boolean;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PaymentMethodInputDocument = Document<
  Types.ObjectId,
  any,
  IPaymentMethodInput
> &
  IPaymentMethodInput;

export const PaymentMethodInputSchema = new Schema<IPaymentMethodInput>(
  {
    name: {
      type: String,
      trim: true,
    },
    placeholder: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ['string', 'number', 'boolean', 'date', 'phone', 'email', 'select'],
    },
    options: [optionsSchema],
    requested: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export const PaymentMethodInput = model<
  IPaymentMethodInput,
  Model<IPaymentMethodInput>
>('PaymentMethodInput', PaymentMethodInputSchema);

export const PaymentMethodInputTC = composeMongoose<PaymentMethodInputDocument>(
  PaymentMethodInput as any
);
