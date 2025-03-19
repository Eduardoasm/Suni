import { Types } from 'mongoose';
import { ContractStatusEnum } from './contract.model';
export declare const ContractTypeName: string;
export declare const ContractType: import("graphql").GraphQLObjectType<any, any>;
export declare const ContractTypePlural: string;
export declare const ContractTypeNonNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./contract.model").ContractDocument, any>>;
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
export declare const GetContractInfoInput = "\n  input GetContractInfoInput {\n    contractId: MongoID!\n  }\n";
export declare const ContractInfoType: string;
export type TCreateContract = {
    loanOffer: Types.ObjectId;
};
export declare const CreateContractInput = "\n  input CreateContract {\n    loanOffer: MongoID!\n  }\n";
export declare const PreCancelInput = "\n  input PreCancel {\n    amountToPay: Float!\n    contractId: MongoID!\n  }\n";
export type TGetContractsFilterByStatus = {
    status: string;
};
export type TGetTransactionsByLenderOrBorrower = {
    user: string;
};
export declare const TransactionsByLenderOrBorrowerInput = "\n  input TransactionsByLenderOrBorrowerInput {\n    user: String\n  }\n";
export declare const TransactionsByLenderOrBorrowerType: string;
export declare const AddOriginalValuesType = "\n  type AddOriginalValuesType {\n    added: Boolean\n  }\n";
export declare const GetContractsFilterByStatusInput = "\n  input GetContractsFilterByStatus {\n    status: String!\n  }\n";
export type TGetContractsByStatusInput = {
    userId: Types.ObjectId;
};
export declare const GetContractsByStatusInput = "\n  input GetContractsByStatusInput {\n    userId: MongoID\n  }\n";
export declare const GetContractsByStatusType: string;
export type TGetContractsFilterByStatusByClient = {
    _id: Types.ObjectId;
};
export declare const GetContractsFilterByStatusByClientInput = "\n  input GetContractsFilterByStatusByClient {\n    _id: MongoID!\n  }\n";
export declare const IncomeType = "\n  type Income {\n    usd: Float!\n    satoshi: Float!\n    btc: Float!\n  }\n";
export declare const IncomesType = "\n  type IncomesType {\n    incomes: [IncomesInfoType]\n  }\n  type IncomesInfoType {\n    date: String!\n    count: Int!\n    income: IncomeType\n  }\n  type IncomeType {\n    usd: Float\n    btc: Float\n    sat: Float\n  }\n";
export declare const InterestType = "\n  type Interest {\n    maxInterest: Float!\n    medInterest: Float!\n    minInterest: Float!\n  }\n";
export type TGetByDate = {
    startDate: Date;
};
export declare const GetByDateInput = "\n  input GetIncomeByDate {\n    startDate: Date!\n  }\n";
export declare const IncomeByDateType = "\n  type IncomeByDate {\n    contractsIncomeByDate: [IncomeByDateType]\n  }\n\n  type IncomeByDateType {\n    _id: Date!\n    fees: Float!\n  }\n";
export declare const loansByDateType = "\n  type loansByDate {\n    contractsLoansByDate: [loansByDateType]\n  }\n\n  type loansByDateType {\n    _id: Date!\n    loans: Float!\n  }\n";
export declare const paymentContractsByMonthType = "\n  type paymentContractsByMonth{\n    defaultPaymentContractsByMonth: [paymentContractsByMonthType]!\n  }\n\n  type paymentContractsByMonthType {\n    total: Int!\n    rangeTime: String!\n  }\n";
export declare const paymentContractsByDateType = "\n  type paymentContractsByDate{\n    defaultPaymentContractsByDate: [paymentContractsByDateType]\n  }\n\n  type paymentContractsByDateType {\n    _id: Date!\n    paymentContracts: Int!\n  }\n";
export declare const indicatorsType = "\ntype indicators {\n  satoshiBalance: Float!\n  totalLoans: Int!\n  onDefault: Float!\n  concluded: Float!\n}\n";
export declare const incomesByMonthType = "\ntype incomesByMonth {\n  days0To7: [incomes]\n  days8To14: [incomes]\n  days15To21: [incomes]\n  days21ToEnd: [incomes]\n}\n\ntype incomes {\n  _id: Date\n  paymentPlanFees: Float\n  total: Int\n}\n";
export type TGetAmortization = {
    amount: number;
    interest: number;
    months: number;
};
export declare const amortizationInput = "\ninput amortization {\n  amount: Float!\n  interest: Float!\n  months: Int!\n}\n";
export declare const amortizationType = "\n  type amortizationType {\n    getAmortization: [procedure]\n  }\n\n  type procedure {\n    paymentDate: Date\n    rate: Float\n    fees: Float\n    amount: Float\n  }\n";
export type TGetContractEarning = {
    amount: number;
    interest: number;
    months: number;
};
export declare const GetContractEarningInput = "\n  input GetContractEarning {\n    amount: Float!\n    interest: Float!\n    months: Int!\n  }\n";
export declare const GetContractEarningType = "\n  type GetContractEarnings {\n    earning: Float!\n  }\n";
export declare const GetPreCancelInfoType = "\n  type GetPreCancelInfo {\n    amountToPay: Float!\n    amountToPayInSats: Float!\n    userWallet: WalletType!\n  }\n";
type RoleEnum = 'lender' | 'borrower';
export type TGetMyContracts = {
    page: number;
    perPage: number;
    startDate: Date;
    endDate: Date;
    role: RoleEnum;
    status: ContractStatusEnum;
};
export declare const GetMyContractsInput = "\n  input GetMyContracts {\n    page: Int!\n    perPage: Int!\n    startDate: Date\n    endDate: Date\n    role: String\n    status: String\n  }\n";
export declare const GetPreCancelInfoInput = "\n  input GetPreCancelInfoInput {\n    contractId: MongoID!\n  }\n";
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
export declare const GetContractsFilterByStatusByUserInput = "\n  input GetContractsFilterByStatusByUser {\n    page: Int!\n    perPage: Int!\n    status: String\n  }\n";
export declare const GetUserStatsType = "\n  type GetUserStats {\n    minAmount: Float\n    maxAmount: Float\n    availableCredit: Float\n    creditsReceived: Int\n    creditsPaidOnTime: Int\n    creditsPaidLate: Int\n  }\n";
export type TGetUserStats = {
    borrower: string;
};
export declare const UserStatsInput = "\n  input UserStats {\n    borrower: String\n  }\n";
export {};
//# sourceMappingURL=contract.dto.d.ts.map