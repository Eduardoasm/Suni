"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateTransactionInput = exports.lenderCreditHistoryType = exports.borrowerCreditHistoryType = exports.TransactionTypeNonNull = exports.TransactionTypePlural = exports.TransactionTypeName = exports.TransactionType = void 0;
const transaction_model_1 = require("./transaction.model");
exports.TransactionType = transaction_model_1.TransactionTC.getType();
exports.TransactionTypeName = transaction_model_1.TransactionTC.getTypeName();
exports.TransactionTypePlural = transaction_model_1.TransactionTC.getTypePlural().getTypeName();
exports.TransactionTypeNonNull = transaction_model_1.TransactionTC.getTypeNonNull();
exports.borrowerCreditHistoryType = `
  type creditHistory {
    creditsLimit: [previousCreditsLimit]
    creditsReceived: [previousCreditsReceived]
    borrowerLastTransaction: ${exports.TransactionType}
  }

  type previousCreditsLimit {
    month: Date
    borrowerCreditLimit: Float
  }

  type previousCreditsReceived {
    month: Date
    borrowed: Float
  }
`;
exports.lenderCreditHistoryType = `
  type lenderCreditHistory {
    transactionsByDate: ${exports.TransactionTypePlural}
  }
`;
// el input lo recibimos string ya que graphql no acepta enum de numeros con string siendo el primero numero, "1D" "2W"
exports.dateTransactionInput = `
  input dateTransaction {
    date: String
  }
`;
//# sourceMappingURL=transaction.dto.js.map