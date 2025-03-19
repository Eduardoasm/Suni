"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatsInput = exports.GetUserStatsType = exports.GetContractsFilterByStatusByUserInput = exports.GetPreCancelInfoInput = exports.GetMyContractsInput = exports.GetPreCancelInfoType = exports.GetContractEarningType = exports.GetContractEarningInput = exports.amortizationType = exports.amortizationInput = exports.incomesByMonthType = exports.indicatorsType = exports.paymentContractsByDateType = exports.paymentContractsByMonthType = exports.loansByDateType = exports.IncomeByDateType = exports.GetByDateInput = exports.InterestType = exports.IncomesType = exports.IncomeType = exports.GetContractsFilterByStatusByClientInput = exports.GetContractsByStatusType = exports.GetContractsByStatusInput = exports.GetContractsFilterByStatusInput = exports.AddOriginalValuesType = exports.TransactionsByLenderOrBorrowerType = exports.TransactionsByLenderOrBorrowerInput = exports.PreCancelInput = exports.CreateContractInput = exports.ContractInfoType = exports.GetContractInfoInput = exports.ContractTypeNonNull = exports.ContractTypePlural = exports.ContractType = exports.ContractTypeName = void 0;
const contract_model_1 = require("./contract.model");
const loanRequest_dto_1 = require("../../loanRequest/loanRequest.dto");
exports.ContractTypeName = contract_model_1.ContractTC.getTypeName();
exports.ContractType = contract_model_1.ContractTC.getType();
exports.ContractTypePlural = contract_model_1.ContractTC.getTypePlural().getTypeName();
exports.ContractTypeNonNull = contract_model_1.ContractTC.getTypeNonNull();
exports.GetContractInfoInput = `
  input GetContractInfoInput {
    contractId: MongoID!
  }
`;
exports.ContractInfoType = `
  type ContractInfoType {
    contract: ${exports.ContractTypeName}
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
exports.CreateContractInput = `
  input CreateContract {
    loanOffer: MongoID!
  }
`;
exports.PreCancelInput = `
  input PreCancel {
    amountToPay: Float!
    contractId: MongoID!
  }
`;
exports.TransactionsByLenderOrBorrowerInput = `
  input TransactionsByLenderOrBorrowerInput {
    user: String
  }
`;
exports.TransactionsByLenderOrBorrowerType = `
  type TransactionsByLenderOrBorrowerType {
    contracts: ${exports.ContractTypePlural}
    loanRequests: ${loanRequest_dto_1.LoanRequestTypePlural}
  }
`;
exports.AddOriginalValuesType = `
  type AddOriginalValuesType {
    added: Boolean
  }
`;
exports.GetContractsFilterByStatusInput = `
  input GetContractsFilterByStatus {
    status: String!
  }
`;
exports.GetContractsByStatusInput = `
  input GetContractsByStatusInput {
    userId: MongoID
  }
`;
exports.GetContractsByStatusType = `
  type GetContractsByStatusType {
    active: ${exports.ContractTypePlural}
    concluded: ${exports.ContractTypePlural}
    onDefault: ${exports.ContractTypePlural}
    contracts: ${exports.ContractTypePlural}
  }
`;
exports.GetContractsFilterByStatusByClientInput = `
  input GetContractsFilterByStatusByClient {
    _id: MongoID!
  }
`;
exports.IncomeType = `
  type Income {
    usd: Float!
    satoshi: Float!
    btc: Float!
  }
`;
exports.IncomesType = `
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
exports.InterestType = `
  type Interest {
    maxInterest: Float!
    medInterest: Float!
    minInterest: Float!
  }
`;
exports.GetByDateInput = `
  input GetIncomeByDate {
    startDate: Date!
  }
`;
exports.IncomeByDateType = `
  type IncomeByDate {
    contractsIncomeByDate: [IncomeByDateType]
  }

  type IncomeByDateType {
    _id: Date!
    fees: Float!
  }
`;
exports.loansByDateType = `
  type loansByDate {
    contractsLoansByDate: [loansByDateType]
  }

  type loansByDateType {
    _id: Date!
    loans: Float!
  }
`;
exports.paymentContractsByMonthType = `
  type paymentContractsByMonth{
    defaultPaymentContractsByMonth: [paymentContractsByMonthType]!
  }

  type paymentContractsByMonthType {
    total: Int!
    rangeTime: String!
  }
`;
exports.paymentContractsByDateType = `
  type paymentContractsByDate{
    defaultPaymentContractsByDate: [paymentContractsByDateType]
  }

  type paymentContractsByDateType {
    _id: Date!
    paymentContracts: Int!
  }
`;
exports.indicatorsType = `
type indicators {
  satoshiBalance: Float!
  totalLoans: Int!
  onDefault: Float!
  concluded: Float!
}
`;
exports.incomesByMonthType = `
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
exports.amortizationInput = `
input amortization {
  amount: Float!
  interest: Float!
  months: Int!
}
`;
exports.amortizationType = `
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
exports.GetContractEarningInput = `
  input GetContractEarning {
    amount: Float!
    interest: Float!
    months: Int!
  }
`;
exports.GetContractEarningType = `
  type GetContractEarnings {
    earning: Float!
  }
`;
exports.GetPreCancelInfoType = `
  type GetPreCancelInfo {
    amountToPay: Float!
    amountToPayInSats: Float!
    userWallet: WalletType!
  }
`;
exports.GetMyContractsInput = `
  input GetMyContracts {
    page: Int!
    perPage: Int!
    startDate: Date
    endDate: Date
    role: String
    status: String
  }
`;
exports.GetPreCancelInfoInput = `
  input GetPreCancelInfoInput {
    contractId: MongoID!
  }
`;
exports.GetContractsFilterByStatusByUserInput = `
  input GetContractsFilterByStatusByUser {
    page: Int!
    perPage: Int!
    status: String
  }
`;
exports.GetUserStatsType = `
  type GetUserStats {
    minAmount: Float
    maxAmount: Float
    availableCredit: Float
    creditsReceived: Int
    creditsPaidOnTime: Int
    creditsPaidLate: Int
  }
`;
exports.UserStatsInput = `
  input UserStats {
    borrower: String
  }
`;
//# sourceMappingURL=contract.dto.js.map