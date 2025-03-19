import type { Request, Response, NextFunction } from 'express';
import { schemaComposer } from 'graphql-compose';
import { ContractTC } from './contract.model';
import {
  ContractType,
  ContractTypePlural,
  CreateContractInput,
  GetByDateInput,
  GetContractsByStatusInput,
  GetContractsByStatusType,
  GetContractsFilterByStatusByClientInput,
  GetContractsFilterByStatusInput,
  IncomeByDateType,
  IncomeType,
  InterestType,
  TCreateContract,
  TGetByDate,
  TGetContractsByStatusInput,
  TGetContractsFilterByStatus,
  TGetContractsFilterByStatusByClient,
  loansByDateType,
  paymentContractsByMonthType,
  paymentContractsByDateType,
  indicatorsType,
  amortizationInput,
  TGetAmortization,
  amortizationType,
  TGetContractEarning,
  GetContractEarningType,
  GetContractEarningInput,
  GetMyContractsInput,
  TGetTransactionsByLenderOrBorrower,
  TransactionsByLenderOrBorrowerType,
  TransactionsByLenderOrBorrowerInput,
  IncomesType,
  TGetContractsFilterByStatusByUser,
  GetContractsFilterByStatusByUserInput,
  GetPreCancelInfoType,
  GetPreCancelInfoInput,
  TPreCancel,
  PreCancelInput,
  GetUserStatsType,
  UserStatsInput,
  AddOriginalValuesType,
  TGetContractInfo,
  ContractInfoType,
  GetContractInfoInput,
} from './contract.dto';
import * as contractService from './contract.service';
import { buildPaginationType } from '../../../utils';

const ContractPaginationType = buildPaginationType('Contract');

export const getContractInfo = schemaComposer.createResolver<
  any,
  {
    data: TGetContractInfo;
  }
>({
  name: 'getContractInfo',
  kind: 'query',
  description: 'get contract info including the lender and borrower data',
  type: ContractInfoType,
  args: {
    data: GetContractInfoInput,
  },
  async resolve({ args }) {
    const contractInfo = await contractService.getContractInfo(args?.data);
    console.log(contractInfo);
    return { ...contractInfo };
  },
});

export const createContract = schemaComposer.createResolver<
  any,
  {
    data: TCreateContract;
  }
>({
  name: 'createContract',
  kind: 'mutation',
  description: 'create contract',
  type: ContractType,
  args: {
    data: CreateContractInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const contract = await contractService.create(args?.data, token);
    return contract;
  },
});

export const preCancel = schemaComposer.createResolver<
  any,
  {
    data: TPreCancel;
  }
>({
  name: 'preCancel',
  kind: 'mutation',
  description: 'pre-cancel contract',
  type: ContractType,
  args: {
    data: PreCancelInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const contract = await contractService.preCancel(args?.data, token);
    return contract;
  },
});

export const addOriginalValues = schemaComposer.createResolver<any>({
  name: 'addOriginalValues',
  kind: 'mutation',
  description: 'incorporate payment plan original values',
  type: AddOriginalValuesType,
  args: {},
  async resolve({ args, context }) {
    const response = await contractService.addOriginalValues();
    return { added: true };
  },
});

export const getTransactionsByLenderOrBorrower = schemaComposer.createResolver<
  any,
  {
    data: TGetTransactionsByLenderOrBorrower;
  }
>({
  name: 'createContract',
  kind: 'query',
  description:
    'get all contracts where the user is either the lender or borrower',
  type: TransactionsByLenderOrBorrowerType,
  args: {
    data: TransactionsByLenderOrBorrowerInput,
  },
  async resolve({ args }) {
    const transactions =
      await contractService.getTransactionsByLenderOrBorrower(args?.data);
    return transactions;
  },
});

export const getContractsFilterByStatus = schemaComposer.createResolver<
  any,
  {
    data: TGetContractsFilterByStatus;
  }
>({
  name: 'getContractsFilterByStatus',
  kind: 'query',
  description: 'get contracts filter by status',
  type: ContractTypePlural,
  args: {
    data: GetContractsFilterByStatusInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const contracts = await contractService.getContractsFilterByStatus(
      args?.data,
      token
    );
    return contracts;
  },
});

export const getContractsByStatus = schemaComposer.createResolver<
  any,
  {
    data: TGetContractsByStatusInput;
  }
>({
  name: 'getContractsByStatus',
  kind: 'query',
  description: 'get contracts divided by status',
  type: GetContractsByStatusType,
  args: { data: GetContractsByStatusInput },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const { active, concluded, onDefault, contracts } =
      await contractService.getContractsByStatus(args?.data, token);
    return { active, concluded, onDefault, contracts };
  },
});

export const getContractsFilterByStatusByClient = schemaComposer.createResolver<
  any,
  {
    data: TGetContractsFilterByStatusByClient;
  }
>({
  name: 'getContractsFilterByStatusByClient',
  kind: 'query',
  description: 'get contracts filter by status by client',
  type: ContractTypePlural,
  args: {
    data: GetContractsFilterByStatusByClientInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const userContracts =
      await contractService.getContractsFilterByStatusByClient(
        args?.data,
        token
      );
    return userContracts;
  },
});

export const totalIncome = schemaComposer.createResolver<any>({
  name: 'totalIncome',
  kind: 'query',
  description: 'get total fees from contracts',
  type: IncomeType,
  async resolve() {
    const income = await contractService.income();
    return income;
  },
});

export const totalIncomes = schemaComposer.createResolver<any>({
  name: 'totalIncomes',
  kind: 'query',
  description: 'get total fees from contracts grouped by date',
  type: IncomesType,
  async resolve() {
    const incomes = await contractService.incomes();
    return { incomes };
  },
});

export const interestRate = schemaComposer.createResolver<any>({
  name: 'interestRate',
  kind: 'query',
  description: 'get min, med, max of interest rate',
  type: InterestType,
  async resolve() {
    const interest = await contractService.interestRate();
    return interest;
  },
});

export const getIncomeByDate = schemaComposer.createResolver<
  any,
  {
    data: TGetByDate;
  }
>({
  name: 'getIncomeByDate',
  kind: 'query',
  description: 'get income filter by date',
  type: IncomeByDateType,
  args: {
    data: GetByDateInput,
  },
  async resolve({ args }) {
    const incomeByDate = await contractService.getIncomeByDate(args?.data);
    return incomeByDate;
  },
});

// export const getIncomeByMonth = schemaComposer.createResolver<
//   any,
//   {
//     data: TGetByDate;
//   }
// >({
//   name: 'getIncomeByMonth',
//   kind: 'query',
//   description: 'get income filter by month',
//   type: incomesByMonthType,
//   args: {
//     data: GetByDateInput,
//   },
//   async resolve({ args }) {
//     const incomeByMonth = await contractService.getIncomeByMonth(args?.data);
//     return incomeByMonth;
//   },
// });

export const getLoansByDate = schemaComposer.createResolver<
  any,
  {
    data: TGetByDate;
  }
>({
  name: 'getLoansByDate',
  kind: 'query',
  description: 'get loans filter by date',
  type: loansByDateType,
  args: {
    data: GetByDateInput,
  },
  async resolve({ args }) {
    const loansByDate = await contractService.getLoansByDate(args?.data);
    return loansByDate;
  },
});

export const getDefaultPaymentContractsByMonth =
  schemaComposer.createResolver<any>({
    name: 'getDefaultPaymentByMonth',
    kind: 'query',
    description: 'get payment default contracts filter by month',
    type: paymentContractsByMonthType,
    async resolve() {
      const defaultPaymentContractsByMonth =
        await contractService.getDefaultPaymentContractsByMonth();
      return defaultPaymentContractsByMonth;
    },
  });

export const getDefaultPaymentContractsByDate = schemaComposer.createResolver<
  any,
  {
    data: TGetByDate;
  }
>({
  name: 'getDefaultPaymentContractsByDate',
  kind: 'query',
  description: 'get default payment contracts filter by date',
  type: paymentContractsByDateType,
  args: {
    data: GetByDateInput,
  },
  async resolve({ args }) {
    const paymentDefaultContractsByDate =
      await contractService.getDefaultPaymentContractsByDate(args?.data);
    return paymentDefaultContractsByDate;
  },
});

export const getDefaultAndSuccessfulPayment =
  schemaComposer.createResolver<any>({
    name: 'getDefaultAndSuccessfulPayment',
    kind: 'query',
    description: 'get default and successful payment',
    type: indicatorsType,
    async resolve() {
      const defaultAndSuccessfulPayment = await contractService.indicators();
      return defaultAndSuccessfulPayment;
    },
  });

export const amortization = schemaComposer.createResolver<
  any,
  {
    data: TGetAmortization;
  }
>({
  name: 'amortization',
  kind: 'query',
  description: 'get all stages from amortization contracts',
  type: amortizationType,
  args: {
    data: amortizationInput,
  },
  async resolve({ args }) {
    const getAmortization = await contractService.amortization(args?.data);
    return getAmortization;
  },
});

export const contractEarning = schemaComposer.createResolver<
  any,
  {
    data: TGetContractEarning;
  }
>({
  name: 'contractEarning',
  kind: 'query',
  description: 'get earnings contract for user',
  type: GetContractEarningType,
  args: {
    data: GetContractEarningInput,
  },
  async resolve({ args }) {
    const getAmortization = await contractService.userEarnings(args?.data);
    return getAmortization;
  },
});

export const getMyContracts = schemaComposer.createResolver<any>({
  name: 'getMyContracts',
  kind: 'query',
  description: 'get all contracts for the user logged',
  type: ContractPaginationType,
  args: {
    data: GetMyContractsInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const contracts = await contractService.getMyContracts(args.data, token);
    return contracts;
  },
});

export const getContractsFilterByStatusByUser = schemaComposer.createResolver<
  any,
  {
    data: TGetContractsFilterByStatusByUser;
  }
>({
  name: 'getContractsFilterByStatusByUser',
  kind: 'query',
  description: 'get contracts filtered by status by user',
  type: ContractPaginationType,
  args: {
    data: GetContractsFilterByStatusByUserInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const userContracts =
      await contractService.getContractsFilterByStatusByUser(args?.data, token);
    return userContracts;
  },
});

export const getPreCancelInfo = schemaComposer.createResolver<any>({
  name: 'getPreCancelInfo',
  kind: 'query',
  description: 'get pre-cancel info',
  type: GetPreCancelInfoType,
  args: {
    data: GetPreCancelInfoInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const info = await contractService.getPreCancelInfo(args.data, token);
    return info;
  },
});

export const getUserStats = schemaComposer.createResolver<any>({
  name: 'getUserStats',
  kind: 'query',
  description: 'get user contracts stats',
  type: GetUserStatsType,
  args: {
    data: UserStatsInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const stats = await contractService.getUserStats(args?.data, token);
    return stats;
  },
});

const contractQueries = {
  contract: ContractTC.mongooseResolvers.findOne(),
  contracts: ContractTC.mongooseResolvers.findMany({
    limit: { defaultValue: 1000000 },
  }),
  contractPagination: ContractTC.mongooseResolvers.pagination(),
  totalLoans: ContractTC.mongooseResolvers.count(),
  totalIncome,
  interestRate,
  getContractsFilterByStatus,
  getContractsByStatus,
  getContractsFilterByStatusByClient,
  getTransactionsByLenderOrBorrower,
  getIncomeByDate,
  totalIncomes,
  getLoansByDate,
  getDefaultPaymentContractsByMonth,
  getDefaultPaymentContractsByDate,
  getDefaultAndSuccessfulPayment,
  amortization,
  contractEarning,
  getMyContracts,
  getContractsFilterByStatusByUser,
  getPreCancelInfo,
  getUserStats,
  getContractInfo,
};

const contractMutations = {
  updateContract: ContractTC.mongooseResolvers.updateOne(),
  createContract,
  preCancel,
  addOriginalValues,
};

// REST Controller

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const contracts = await contractService.find({});
    return res.status(200).json({ success: true, contracts });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const contract = await contractService.findOne({ _id: req.params._id });
    return res.status(200).json({ success: true, contract });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function createOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers?.authorization;
    const contract = await contractService.create(req.body, token);
    return res.status(200).json({ success: true, contract });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function updateOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const contract = await contractService.updateOne(
      { _id: req.params._id },
      req.body
    );
    return res.status(200).json({ success: true, contract });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function pagination(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await contractService.pagination(
      Number(req.params.page),
      Number(req.params.perPage)
    );
    return res.status(200).json({ success: true, pagination: data });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function getContractAndCreditScoreDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await contractService.contractAndCreditScoreDetails();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log('Error in get contract and credit score details: ', error);
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export { contractQueries, contractMutations };
