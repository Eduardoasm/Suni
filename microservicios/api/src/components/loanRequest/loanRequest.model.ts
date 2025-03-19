import { composeMongoose } from 'graphql-compose-mongoose';
import { Schema, Model, Types, Document, model } from 'mongoose';
import { CurrencyTC, ICurrency } from '../currency';
import { ILoanOffer, LoanOfferTC } from '../loanOffer/loanOffer.model';

export type LoanRequestStatusEnum =
  | 'active'
  | 'closed'
  | 'canceled'
  | 'expired';

export interface ILoanRequest {
  _id?: any;
  amountInUSDC: number;
  installments: number;
  timesClicked: number;
  selectedWallet: string;
  borrower: string;
  borrowerInfo?: {
    name: string;
    lastName: string;
    country: string;
    dni: string;
    email: string;
  };
  status?: LoanRequestStatusEnum;
  selectedWalletCurrency: Types.ObjectId | ICurrency;
  offers: Array<Types.ObjectId | ILoanOffer>;
  active: boolean;
  referenceNumber: number;
  blockId?: string;
  country?: string;
  creditScore?: number;
}

export type LoanRequestDocument = Document<Types.ObjectId, any, ILoanRequest> &
  ILoanRequest;

export const loanRequestSchema = new Schema<ILoanRequest>(
  {
    amountInUSDC: {
      type: Number,
    },
    installments: {
      type: Number,
    },
    timesClicked: {
      type: Number,
      default: 0,
    },
    selectedWallet: {
      type: String,
    },
    borrowerInfo: {
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
      enum: ['active', 'closed', 'canceled', 'expired'],
      default: 'active',
    },
    selectedWalletCurrency: {
      type: Schema.Types.ObjectId,
      ref: 'Currency',
    },
    offers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'LoanOffer',
      },
    ],
    referenceNumber: {
      type: Number,
      unique: true,
    },
    blockId: {
      type: String,
    },
    country: {
      type: String,
    },
    creditScore: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

loanRequestSchema.pre('save', async function (next) {
  if (!this.referenceNumber) {
    // Buscar el número de referencia más alto en la colección y sumarle 1
    const highest = await LoanRequest.findOne().sort('-referenceNumber').exec();
    this.referenceNumber = (highest && highest.referenceNumber + 1) || 100000;
  }
  next();
});

export const LoanRequest = model<ILoanRequest, Model<ILoanRequest>>(
  'LoanRequest',
  loanRequestSchema
);

export const LoanRequestTC = composeMongoose<LoanRequestDocument>(
  LoanRequest as any
);
LoanRequestTC.addRelation('selectedWalletCurrency', {
  resolver: () => CurrencyTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.selectedWalletCurrency,
  },
  projection: { selectedWalletCurrency: 1 },
});

LoanRequestTC.addRelation('offers', {
  resolver: () => LoanOfferTC.mongooseResolvers.dataLoaderMany(),
  prepareArgs: {
    _ids: (source) => source.offers,
  },
  projection: { offers: 1 },
});
