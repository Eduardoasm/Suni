import { Model, model, Schema, Types, Document } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { CurrencyTC, ICurrency } from '../currency';

export type LoanOfferStatusEnum =
  | 'active'
  | 'approved'
  | 'rejected'
  | 'canceled'
  | 'expired';

export interface ILoanOffer {
  _id?: any;
  amount: number;
  installments: number;
  lender: string;
  lenderInfo: {
    name: string;
    lastName: string;
    country: string;
    dni: string;
    email: string;
  };
  borrower: string;
  status?: LoanOfferStatusEnum;
  currency: Types.ObjectId | ICurrency;
  expirationDate: Date;
  selectedWallet: string;
  interestRate: number;
  referenceNumber: number;
  blockId: string;
  blockedAmountInWalletCurrency: number;
  lenderFeeInUSDC: number;
  lenderFeeInWalletCurrency: number;
  active: boolean;
  referenceNumberOfLoanRequest: number;
}

export type LoanOfferDocument = Document<Types.ObjectId, any, ILoanOffer> &
  ILoanOffer;

export const loanOfferSchema = new Schema<ILoanOffer>(
  {
    amount: {
      type: Number,
    },
    installments: {
      type: Number,
    },
    lender: {
      type: String,
    },
    lenderInfo: {
      name: {
        type: String,
      },
      lastName: {
        type: String,
      },
      country: {
        type: String,
        default: 'VEN',
      },
      dni: {
        type: String,
      },
      email: {
        type: String,
      },
    },
    borrower: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'approved', 'rejected', 'canceled', 'expired'],
      default: 'active',
    },
    currency: {
      type: Schema.Types.ObjectId,
      ref: 'Currency',
    },
    expirationDate: {
      type: Date,
    },
    selectedWallet: {
      type: String,
    },
    interestRate: {
      type: Number,
    },
    referenceNumber: {
      type: Number,
      unique: true,
    },
    blockId: {
      type: String,
    },
    blockedAmountInWalletCurrency: {
      type: Number,
    },
    lenderFeeInUSDC: {
      type: Number,
    },
    lenderFeeInWalletCurrency: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: true,
    },
    referenceNumberOfLoanRequest: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

loanOfferSchema.pre('save', async function (next) {
  if (!this.referenceNumber) {
    // Buscar el número de referencia más alto en la colección y sumarle 1
    const highest = await LoanOffer.findOne().sort('-referenceNumber').exec();
    this.referenceNumber = (highest && highest.referenceNumber + 1) || 100000;
  }
  next();
});

export const LoanOffer = model<ILoanOffer, Model<ILoanOffer>>(
  'LoanOffer',
  loanOfferSchema
);

export const LoanOfferTC = composeMongoose<LoanOfferDocument>(LoanOffer as any);

LoanOfferTC.addRelation('currency', {
  resolver: () => CurrencyTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.currency,
  },
  projection: { currency: 1 },
});
