import { Types, model, Document, Model, Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { CurrencyTC, ICurrency } from '../../currency';
import { IPaymentPlan, paymentPlanSchema } from '../payment-plan';
import { ILoanRequest, LoanRequestTC } from '../../loanRequest';
import { ILoanOffer, LoanOfferTC } from '../../loanOffer/loanOffer.model';

export type ContractStatusEnum = 'active' | 'concluded';

export interface IContract {
  _id?: any;
  loanRequest?: Types.ObjectId | ILoanRequest;
  loanOffer?: Types.ObjectId | ILoanOffer;
  lender: string; // Ref to user in SUNI
  borrower: string; // Ref to user in SUNI
  walletTransactionsCurrency: Types.ObjectId | ICurrency;
  amountInUSDC: number;
  amountReceivedInWalletTransactionsCurrency: number;
  rate: number;
  status: ContractStatusEnum;
  paymentPlan: Array<IPaymentPlan>;
  startDate: Date;
  lenderFeeInUSDC: number;
  lenderFeeInWalletTransactionsCurrency: number;
  borrowerFeeInUSDC: number;
  borrowerFeeInWalletTransactionsCurrency: number;
  referenceNumber: number;
  onDefault: boolean;
  paymentDue: boolean;
  preCancel?: boolean;
  commerce?: string;
  borrowerSelectedWallet?: string;
  lenderSelectedWallet?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ContractDocument = Document<Types.ObjectId, any, IContract> &
  IContract;

const contractSchema = new Schema<IContract>(
  {
    loanRequest: {
      type: Schema.Types.ObjectId,
      ref: 'LoanRequest',
    },
    loanOffer: {
      type: Schema.Types.ObjectId,
      ref: 'LoanOffer',
    },
    lender: {
      type: String, // Ref to user in SUNI
    },
    borrower: {
      type: String, // Ref to user in SUNI
    },
    walletTransactionsCurrency: {
      type: Schema.Types.ObjectId,
      ref: 'Currency',
    },
    amountInUSDC: {
      type: Number,
    },
    amountReceivedInWalletTransactionsCurrency: {
      type: Number,
    },
    rate: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['active', 'concluded'],
      default: 'active',
    },
    paymentPlan: [paymentPlanSchema],
    startDate: {
      type: Date,
    },
    lenderFeeInUSDC: {
      type: Number,
    },
    lenderFeeInWalletTransactionsCurrency: {
      type: Number,
    },
    borrowerFeeInUSDC: {
      type: Number,
    },
    borrowerFeeInWalletTransactionsCurrency: {
      type: Number,
    },
    referenceNumber: {
      type: Number,
      unique: true,
    },
    onDefault: {
      type: Boolean,
      default: false,
    },
    paymentDue: {
      type: Boolean,
      default: false,
    },
    preCancel: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    commerce: {
      type: String,
      trim: true,
    },
    borrowerSelectedWallet: {
      type: String,
      trim: true,
    },
    lenderSelectedWallet: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

contractSchema.pre('save', async function (next) {
  if (!this.referenceNumber) {
    // Buscar el número de referencia más alto en la colección y sumarle 1
    const highest = await Contract.findOne().sort('-referenceNumber').exec();
    this.referenceNumber = (highest && highest.referenceNumber + 1) || 100000;
  }
  next();
});

export const Contract = model<IContract, Model<IContract>>(
  'Contract',
  contractSchema
);

export const ContractTC = composeMongoose<ContractDocument>(Contract as any);

ContractTC.addRelation('walletTransactionsCurrency', {
  resolver: () => CurrencyTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.walletTransactionsCurrency,
  },
  projection: { walletTransactionsCurrency: 1 },
});

ContractTC.addRelation('loanRequest', {
  resolver: () => LoanRequestTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.loanRequest,
  },
  projection: { loanRequest: 1 },
});

ContractTC.addRelation('loanOffer', {
  resolver: () => LoanOfferTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.loanOffer,
  },
  projection: { loanOffer: 1 },
});
