import { Types } from 'mongoose';
import { ContractStatusEnum, ContractTC } from './contract.model';
import { LoanRequestTypePlural } from '../../loanRequest/loanRequest.dto';

export const ContractTypeName = ContractTC.getTypeName();
export const ContractType = ContractTC.getType();
export const ContractTypePlural = ContractTC.getTypePlural().getTypeName();
export const ContractTypeNonNull = ContractTC.getTypeNonNull();

export type TPaymentPlan = {
  payment: Date;
  principal: number;
  interest: number;
  fees: number;
  amount: number;
};

export type TGetContractInfo = {
  contractId: string;
};

export const GetContractInfoInput = `
  input GetContractInfoInput {
    contractId: MongoID!
  }
`;

export const ContractInfoType = `
  type ContractInfoType {
    contract: ${ContractTypeName}
    clientsInfo: ClientInfoType
  }
  type ClientInfoType {
    lender: ClientInfoData
    borrower: ClientInfoData
  }
  type ClientInfoData {
    name: String
    lastName: String
    country: String
    dni: String
    email: String
  }
`;

export type TCreateContract = {
  loanOffer: Types.ObjectId;
};

export const CreateContractInput = `
  input CreateContract {
    loanOffer: MongoID!
  }
`;

export const PreCancelInput = `
  input PreCancel {
    amountToPay: Float!
    contractId: MongoID!
  }
`;

export type TGetContractsFilterByStatus = {
  status: string;
};

export type TGetTransactionsByLenderOrBorrower = {
  user: string;
};

export const TransactionsByLenderOrBorrowerInput = `
  input TransactionsByLenderOrBorrowerInput {
    user: String
  }
`;

export const TransactionsByLenderOrBorrowerType = `
  type TransactionsByLenderOrBorrowerType {
    contracts: ${ContractTypePlural}
    loanRequests: ${LoanRequestTypePlural}
  }
`;

export const AddOriginalValuesType = `
  type AddOriginalValuesType {
    added: Boolean
  }
`;

export const GetContractsFilterByStatusInput = `
  input GetContractsFilterByStatus {
    status: String!
  }
`;

export type TGetContractsByStatusInput = {
  userId: Types.ObjectId;
};

export const GetContractsByStatusInput = `
  input GetContractsByStatusInput {
    userId: MongoID
  }
`;

export const GetContractsByStatusType = `
  type GetContractsByStatusType {
    active: ${ContractTypePlural}
    concluded: ${ContractTypePlural}
    onDefault: ${ContractTypePlural}
    contracts: ${ContractTypePlural}
  }
`;

export type TGetContractsFilterByStatusByClient = {
  _id: Types.ObjectId;
};

export const GetContractsFilterByStatusByClientInput = `
  input GetContractsFilterByStatusByClient {
    _id: MongoID!
  }
`;

export const IncomeType = `
  type Income {
    usd: Float!
    satoshi: Float!
    btc: Float!
  }
`;

export const IncomesType = `
  type IncomesType {
    incomes: [IncomesInfoType]
  }
  type IncomesInfoType {
    date: String!
    count: Int!
    income: IncomeType
  }
  type IncomeType {
    usd: Float
    btc: Float
    sat: Float
  }
`;

export const InterestType = `
  type Interest {
    maxInterest: Float!
    medInterest: Float!
    minInterest: Float!
  }
`;

export type TGetByDate = {
  startDate: Date;
};

export const GetByDateInput = `
  input GetIncomeByDate {
    startDate: Date!
  }
`;

export const IncomeByDateType = `
  type IncomeByDate {
    contractsIncomeByDate: [IncomeByDateType]
  }

  type IncomeByDateType {
    _id: Date!
    fees: Float!
  }
`;

export const loansByDateType = `
  type loansByDate {
    contractsLoansByDate: [loansByDateType]
  }

  type loansByDateType {
    _id: Date!
    loans: Float!
  }
`;

export const paymentContractsByMonthType = `
  type paymentContractsByMonth{
    defaultPaymentContractsByMonth: [paymentContractsByMonthType]!
  }

  type paymentContractsByMonthType {
    total: Int!
    rangeTime: String!
  }
`;

export const paymentContractsByDateType = `
  type paymentContractsByDate{
    defaultPaymentContractsByDate: [paymentContractsByDateType]
  }

  type paymentContractsByDateType {
    _id: Date!
    paymentContracts: Int!
  }
`;

export const indicatorsType = `
type indicators {
  satoshiBalance: Float!
  totalLoans: Int!
  onDefault: Float!
  concluded: Float!
}
`;

export const incomesByMonthType = `
type incomesByMonth {
  days0To7: [incomes]
  days8To14: [incomes]
  days15To21: [incomes]
  days21ToEnd: [incomes]
}

type incomes {
  _id: Date
  paymentPlanFees: Float
  total: Int
}
`;

export type TGetAmortization = {
  amount: number;
  interest: number;
  months: number;
};

export const amortizationInput = `
input amortization {
  amount: Float!
  interest: Float!
  months: Int!
}
`;

export const amortizationType = `
  type amortizationType {
    getAmortization: [procedure]
  }

  type procedure {
    paymentDate: Date
    rate: Float
    fees: Float
    amount: Float
  }
`;

export type TGetContractEarning = {
  amount: number;
  interest: number;
  months: number;
};

export const GetContractEarningInput = `
  input GetContractEarning {
    amount: Float!
    interest: Float!
    months: Int!
  }
`;

export const GetContractEarningType = `
  type GetContractEarnings {
    earning: Float!
  }
`;

export const GetPreCancelInfoType = `
  type GetPreCancelInfo {
    amountToPay: Float!
    amountToPayInSats: Float!
    userWallet: WalletType!
  }
`;

type RoleEnum = 'lender' | 'borrower';

export type TGetMyContracts = {
  page: number;
  perPage: number;
  startDate: Date;
  endDate: Date;
  role: RoleEnum;
  status: ContractStatusEnum;
};

export const GetMyContractsInput = `
  input GetMyContracts {
    page: Int!
    perPage: Int!
    startDate: Date
    endDate: Date
    role: String
    status: String
  }
`;

export const GetPreCancelInfoInput = `
  input GetPreCancelInfoInput {
    contractId: MongoID!
  }
`;

export type TSendContract = {
  lenderName: string;
  lenderLastName: string;
  lenderCountry: string;
  lenderDni: string;
  lenderEmail: string;
  borrowerName: string;
  borrowerLastName: string;
  borrowerCountry: string;
  borrowerDni: string;
  borrowerEmail: string;
  amountInUSDC: number;
  installments: number;
  firstPaymentDate: Date;
  interestRate: number;
  moraFee: number;
  templateContent: string;
  currentDay: string;
  currentMonth: string;
  currentYear: string;
  requestId: string;
  offerReferenceNumber: number;
};

export type TGetContractsFilterByStatusByUser = {
  status: ContractStatusEnum;
  page: number;
  perPage: number;
};

export type TGetPreCancelInfo = {
  contractId: Types.ObjectId;
};

export type TPreCancel = {
  amountToPay: number;
  contractId: Types.ObjectId;
};

export const GetContractsFilterByStatusByUserInput = `
  input GetContractsFilterByStatusByUser {
    page: Int!
    perPage: Int!
    status: String
  }
`;

export const GetUserStatsType = `
  type GetUserStats {
    minAmount: Float
    maxAmount: Float
    availableCredit: Float
    creditsReceived: Int
    creditsPaidOnTime: Int
    creditsPaidLate: Int
  }
`;

export type TGetUserStats = {
  borrower: string;
};

export const UserStatsInput = `
  input UserStats {
    borrower: String
  }
`;
