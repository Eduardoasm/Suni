import { Schema } from 'mongoose';
import { schemaComposer } from 'graphql-compose';
import { convertSchemaToGraphQL } from 'graphql-compose-mongoose';

export type PaymentPlanStatusEnum =
  | 'successful'
  | 'on_default'
  | 'next_payment'
  | 'active';

export interface IPaymentPlan {
  _id?: any;
  paymentDate: Date;
  rate: number; // interest rate
  fees: number; // interest amount
  originalFees?: number;
  amount: number; // installment
  originalAmount?: number;
  status?: PaymentPlanStatusEnum;
  paid?: boolean;
  active?: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}

export const paymentPlanSchema = new Schema<IPaymentPlan>(
  {
    paymentDate: {
      type: Date,
    },
    rate: {
      type: Number,
    },
    fees: {
      type: Number,
    },
    originalFees: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    originalAmount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['successful', 'on_default', 'next_payment', 'active'],
      default: 'active',
    },
    paid: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

convertSchemaToGraphQL(paymentPlanSchema, 'PaymentPlan', schemaComposer);
