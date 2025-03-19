"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionPaginationType = exports.GetTransactionUserInput = exports.ReleaseCryptoInput = exports.GetFeeType = exports.GetFeeInput = exports.ManageCryptoAdminInput = exports.FindOneTransactionInput = exports.NotifyPaymentInput = exports.InProgressTransactionType = exports.CancelTransactionInput = exports.CreateTransactionInput = exports.TransactionTypeNotNull = exports.TransactionTypePlural = exports.TransactionTypeName = exports.TransactionType = void 0;
const transaction_model_1 = require("./transaction.model");
exports.TransactionType = transaction_model_1.TransactionTC.getType();
exports.TransactionTypeName = transaction_model_1.TransactionTC.getTypeName();
exports.TransactionTypePlural = transaction_model_1.TransactionTC.getTypePlural().getTypeName();
exports.TransactionTypeNotNull = transaction_model_1.TransactionTC.getTypeNonNull().getTypeName();
exports.CreateTransactionInput = `
  input CreateTransactionInput {
    listingId: MongoID!
    paymentMethod: MongoID
    amount: Float
    selectedWallet: String!
  }
`;
exports.CancelTransactionInput = `
  input CancelTransactionInput {
    transactionId: MongoID!
  }
`;
exports.InProgressTransactionType = `
  type InProgressTransactionType {
    makerTransactions: [${exports.TransactionType}]
    takerTransactions: [${exports.TransactionType}]
    totalMakerTransactions: Float!
    totalTakerTransactions: Float!
    total: Float!
  }
`;
exports.NotifyPaymentInput = `
  input NotifyPaymentInput {
    transactionId: MongoID!
    paymentMethod: MongoID
  }
`;
exports.FindOneTransactionInput = `
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
exports.ManageCryptoAdminInput = `
  input ManageCryptoAdminInput {
    appealId: MongoID!
    transactionId: MongoID!
    decisionType: String!
    finalResultDescription: String
  }
`;
exports.GetFeeInput = `
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
exports.GetFeeType = `
  type GetFeeType {
    fee: Float!
    valid: Boolean
    minTransAmount: Float!
  }
`;
exports.ReleaseCryptoInput = `
  input ReleaseCryptoInput {
    transactionId: MongoID!
  }
`;
exports.GetTransactionUserInput = `
  input GetTransactionUser {
    role: String
    asset: MongoID
    page: Int
    perPage: Int
    status: String
  }
`;
exports.TransactionPaginationType = `
  type PaginationTransaction {
    count: Int!
    items: [${exports.TransactionType}]
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
//# sourceMappingURL=transaction.dto.js.map