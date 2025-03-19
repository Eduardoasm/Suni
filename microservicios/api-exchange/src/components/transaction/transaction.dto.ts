import { Types } from 'mongoose';
import {
  TransactionRoleEnum,
  TransactionStatusEnum,
  TransactionTC,
} from './transaction.model';

export const TransactionType = TransactionTC.getType();
export const TransactionTypeName = TransactionTC.getTypeName();
export const TransactionTypePlural =
  TransactionTC.getTypePlural().getTypeName();
export const TransactionTypeNotNull =
  TransactionTC.getTypeNonNull().getTypeName();

export interface TCreateTransaction {
  listingId: Types.ObjectId;
  paymentMethod?: Types.ObjectId;
  amount: number;
  selectedWallet: string;
  maker: string;
}

export const CreateTransactionInput = `
  input CreateTransactionInput {
    listingId: MongoID!
    paymentMethod: MongoID
    amount: Float
    selectedWallet: String!
  }
`;

export interface TCancelTransaction {
  transactionId: Types.ObjectId;
}

export const CancelTransactionInput = `
  input CancelTransactionInput {
    transactionId: MongoID!
  }
`;

export const InProgressTransactionType = `
  type InProgressTransactionType {
    makerTransactions: [${TransactionType}]
    takerTransactions: [${TransactionType}]
    totalMakerTransactions: Float!
    totalTakerTransactions: Float!
    total: Float!
  }
`;

export interface TNotifyPayment {
  transactionId: Types.ObjectId;
  paymentMethod?: Types.ObjectId;
}

export const NotifyPaymentInput = `
  input NotifyPaymentInput {
    transactionId: MongoID!
    paymentMethod: MongoID
  }
`;

export const FindOneTransactionInput = `
  input FindOneTransactionInput {
    _id: MongoID
    listing: MongoID
    maker: String
    taker: String
    amount: Float
    status: String
    appealed: Boolean
    paymentMethod: MongoID
    active: Boolean
    createdAt: Date
    updatedAt: Date
    referenceNumber: Int
    selectedWallet: String
    loanAdId: String
    amountUsd: Float
    makerFee: Float
    takerFee: Float
  }
`;

export interface TReleaseCrypto {
  transactionId: Types.ObjectId;
}

export interface TManageCryptoAdmin {
  appealId: Types.ObjectId;
  transactionId: Types.ObjectId;
  decisionType: string;
  finalResultDescription?: string;
}

export const ManageCryptoAdminInput = `
  input ManageCryptoAdminInput {
    appealId: MongoID!
    transactionId: MongoID!
    decisionType: String!
    finalResultDescription: String
  }
`;

export type UserRoleEnum = 'maker' | 'taker';

export type TransactionTypeEnum = 'purchase' | 'sale';

export interface TGetFee {
  transactionAmount: number;
  assetNetwork: string;
  transactionType: TransactionTypeEnum;
  userRole: UserRoleEnum;
}

export const GetFeeInput = `
  input GetFeeInput {
    transactionAmount: Float!
    assetNetwork: String!
    transactionType: TransactionTypeEnum!
    userRole: UserRoleEnum!
  }

  enum TransactionTypeEnum {
    purchase
    sale
  }

  enum UserRoleEnum {
    maker
    taker
  }
`;

export const GetFeeType = `
  type GetFeeType {
    fee: Float!
    valid: Boolean
    minTransAmount: Float!
  }
`;

export const ReleaseCryptoInput = `
  input ReleaseCryptoInput {
    transactionId: MongoID!
  }
`;

export type TGetTransactionUser = {
  role: TransactionRoleEnum;
  asset: Types.ObjectId;
  page: number;
  perPage: number;
  status: TransactionStatusEnum;
};

export const GetTransactionUserInput = `
  input GetTransactionUser {
    role: String
    asset: MongoID
    page: Int
    perPage: Int
    status: String
  }
`;

export const TransactionPaginationType = `
  type PaginationTransaction {
    count: Int!
    items: [${TransactionType}]
    pageInfo: PageInfo!
  }
  type PageInfoTransaction {
    currentPage: Int
    perPage: Int
    itemCount: Int
    pageCount: Int
    hasPreviousPage: Boolean
    hasNextPage: Boolean
  }
`;
