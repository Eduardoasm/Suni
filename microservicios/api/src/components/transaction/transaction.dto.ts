import { TransactionTC } from './transaction.model';

export const TransactionType = TransactionTC.getType();
export const TransactionTypeName = TransactionTC.getTypeName();
export const TransactionTypePlural =
  TransactionTC.getTypePlural().getTypeName();
export const TransactionTypeNonNull = TransactionTC.getTypeNonNull();

export const borrowerCreditHistoryType = `
  type creditHistory {
    creditsLimit: [previousCreditsLimit]
    creditsReceived: [previousCreditsReceived]
    borrowerLastTransaction: ${TransactionType}
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

export type userTransactionEnum = 'borrower' | 'lender';

export type dateTransactionEnum = '1D' | '7D' | '2W' | '1M' | '6M' | '1Y';

export const lenderCreditHistoryType = `
  type lenderCreditHistory {
    transactionsByDate: ${TransactionTypePlural}
  }
`;
// el input lo recibimos string ya que graphql no acepta enum de numeros con string siendo el primero numero, "1D" "2W"
export const dateTransactionInput = `
  input dateTransaction {
    date: String
  }
`;
