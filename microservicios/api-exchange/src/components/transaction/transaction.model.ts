import { Schema, Document, Types, Model, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { IPaymentMethod, PaymentMethodTC } from '../paymentMethod';
import { IListing, ListingTC } from '../listing/listing/listing.model';
import { IUser, userSchema } from '../user/user.schema';

export type TransactionRoleEnum = 'purchase' | 'sale';

export type TransactionStatusEnum =
  | 'pending'
  | 'payment_executed'
  | 'payment_received'
  | 'successful'
  | 'default'
  | 'cancelled'
  | 'appealed';

export type timeAppealEnum = 15 | 30 | 45 | 60;

export interface ITransaction {
  _id?: any;
  listing: Types.ObjectId | IListing;
  taker: IUser;
  maker: IUser;
  amount: number;
  status: TransactionStatusEnum;
  appealed: boolean;
  appealedBy?: IUser;
  paymentMethod?: Types.ObjectId | IPaymentMethod;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  referenceNumber: number;
  selectedWallet: string;
  loanAdId: string;
  amountUsd: number;
  makerFee: number;
  takerFee: number;
  fiatAmount: number;
}

export type TransactionDocument = Document<Types.ObjectId, any, ITransaction> &
  ITransaction;

const transactionSchema = new Schema<ITransaction>(
  {
    listing: {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
    },
    taker: {
      type: userSchema,
      required: [true, 'Por favor inserta un user'],
    },
    maker: {
      type: userSchema,
      required: [true, 'Por favor inserta un user'],
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      enum: [
        'pending',
        'payment_executed',
        'payment_received',
        'successful',
        'default',
        'cancelled',
      ],
      default: 'pending',
    },
    appealed: {
      type: Boolean,
      default: false,
    },
    appealedBy: {
      type: userSchema,
    },
    paymentMethod: {
      type: Schema.Types.ObjectId,
      ref: 'PaymentMethod',
    },
    referenceNumber: {
      type: Number,
      unique: true,
    },
    selectedWallet: {
      type: String,
    },
    loanAdId: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    amountUsd: {
      type: Number,
      required: [true, 'Please insert an amount in Usd'],
    },
    makerFee: {
      type: Number,
    },
    takerFee: {
      type: Number,
    },
    fiatAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);

transactionSchema.pre('save', async function (next) {
  if (!this.referenceNumber) {
    // Buscar el número de referencia más alto en la colección y sumarle 1
    const highest = await Transaction.findOne().sort('-referenceNumber').exec();
    this.referenceNumber = (highest && highest.referenceNumber + 1) || 100000;
  }
  next();
});

export const Transaction = model<
  TransactionDocument,
  Model<TransactionDocument>
>('Transaction', transactionSchema);

export const TransactionTC = composeMongoose<TransactionDocument>(
  Transaction as any
);

TransactionTC.addRelation('paymentMethod', {
  resolver: () => PaymentMethodTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.paymentMethod,
  },
  projection: { paymentMethod: 1 },
});

TransactionTC.addRelation('listing', {
  resolver: () => ListingTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.listing,
  },
  projection: { listing: 1 },
});
