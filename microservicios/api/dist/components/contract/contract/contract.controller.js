"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractMutations = exports.contractQueries = exports.getContractAndCreditScoreDetails = exports.pagination = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = exports.getUserStats = exports.getPreCancelInfo = exports.getContractsFilterByStatusByUser = exports.getMyContracts = exports.contractEarning = exports.amortization = exports.getDefaultAndSuccessfulPayment = exports.getDefaultPaymentContractsByDate = exports.getDefaultPaymentContractsByMonth = exports.getLoansByDate = exports.getIncomeByDate = exports.interestRate = exports.totalIncomes = exports.totalIncome = exports.getContractsFilterByStatusByClient = exports.getContractsByStatus = exports.getContractsFilterByStatus = exports.getTransactionsByLenderOrBorrower = exports.addOriginalValues = exports.preCancel = exports.createContract = exports.getContractInfo = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const contract_model_1 = require("./contract.model");
const contract_dto_1 = require("./contract.dto");
const contractService = tslib_1.__importStar(require("./contract.service"));
const utils_1 = require("../../../utils");
const ContractPaginationType = (0, utils_1.buildPaginationType)('Contract');
exports.getContractInfo = graphql_compose_1.schemaComposer.createResolver({
    name: 'getContractInfo',
    kind: 'query',
    description: 'get contract info including the lender and borrower data',
    type: contract_dto_1.ContractInfoType,
    args: {
        data: contract_dto_1.GetContractInfoInput,
    },
    resolve({ args }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const contractInfo = yield contractService.getContractInfo(args === null || args === void 0 ? void 0 : args.data);
            console.log(contractInfo);
            return Object.assign({}, contractInfo);
        });
    },
});
exports.createContract = graphql_compose_1.schemaComposer.createResolver({
    name: 'createContract',
    kind: 'mutation',
    description: 'create contract',
    type: contract_dto_1.ContractType,
    args: {
        data: contract_dto_1.CreateContractInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const contract = yield contractService.create(args === null || args === void 0 ? void 0 : args.data, token);
            return contract;
        });
    },
});
exports.preCancel = graphql_compose_1.schemaComposer.createResolver({
    name: 'preCancel',
    kind: 'mutation',
    description: 'pre-cancel contract',
    type: contract_dto_1.ContractType,
    args: {
        data: contract_dto_1.PreCancelInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const contract = yield contractService.preCancel(args === null || args === void 0 ? void 0 : args.data, token);
            return contract;
        });
    },
});
exports.addOriginalValues = graphql_compose_1.schemaComposer.createResolver({
    name: 'addOriginalValues',
    kind: 'mutation',
    description: 'incorporate payment plan original values',
    type: contract_dto_1.AddOriginalValuesType,
    args: {},
    resolve({ args, context }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const response = yield contractService.addOriginalValues();
            return { added: true };
        });
    },
});
exports.getTransactionsByLenderOrBorrower = graphql_compose_1.schemaComposer.createResolver({
    name: 'createContract',
    kind: 'query',
    description: 'get all contracts where the user is either the lender or borrower',
    type: contract_dto_1.TransactionsByLenderOrBorrowerType,
    args: {
        data: contract_dto_1.TransactionsByLenderOrBorrowerInput,
    },
    resolve({ args }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const transactions = yield contractService.getTransactionsByLenderOrBorrower(args === null || args === void 0 ? void 0 : args.data);
            return transactions;
        });
    },
});
exports.getContractsFilterByStatus = graphql_compose_1.schemaComposer.createResolver({
    name: 'getContractsFilterByStatus',
    kind: 'query',
    description: 'get contracts filter by status',
    type: contract_dto_1.ContractTypePlural,
    args: {
        data: contract_dto_1.GetContractsFilterByStatusInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const contracts = yield contractService.getContractsFilterByStatus(args === null || args === void 0 ? void 0 : args.data, token);
            return contracts;
        });
    },
});
exports.getContractsByStatus = graphql_compose_1.schemaComposer.createResolver({
    name: 'getContractsByStatus',
    kind: 'query',
    description: 'get contracts divided by status',
    type: contract_dto_1.GetContractsByStatusType,
    args: { data: contract_dto_1.GetContractsByStatusInput },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const { active, concluded, onDefault, contracts } = yield contractService.getContractsByStatus(args === null || args === void 0 ? void 0 : args.data, token);
            return { active, concluded, onDefault, contracts };
        });
    },
});
exports.getContractsFilterByStatusByClient = graphql_compose_1.schemaComposer.createResolver({
    name: 'getContractsFilterByStatusByClient',
    kind: 'query',
    description: 'get contracts filter by status by client',
    type: contract_dto_1.ContractTypePlural,
    args: {
        data: contract_dto_1.GetContractsFilterByStatusByClientInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const userContracts = yield contractService.getContractsFilterByStatusByClient(args === null || args === void 0 ? void 0 : args.data, token);
            return userContracts;
        });
    },
});
exports.totalIncome = graphql_compose_1.schemaComposer.createResolver({
    name: 'totalIncome',
    kind: 'query',
    description: 'get total fees from contracts',
    type: contract_dto_1.IncomeType,
    resolve() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const income = yield contractService.income();
            return income;
        });
    },
});
exports.totalIncomes = graphql_compose_1.schemaComposer.createResolver({
    name: 'totalIncomes',
    kind: 'query',
    description: 'get total fees from contracts grouped by date',
    type: contract_dto_1.IncomesType,
    resolve() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const incomes = yield contractService.incomes();
            return { incomes };
        });
    },
});
exports.interestRate = graphql_compose_1.schemaComposer.createResolver({
    name: 'interestRate',
    kind: 'query',
    description: 'get min, med, max of interest rate',
    type: contract_dto_1.InterestType,
    resolve() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const interest = yield contractService.interestRate();
            return interest;
        });
    },
});
exports.getIncomeByDate = graphql_compose_1.schemaComposer.createResolver({
    name: 'getIncomeByDate',
    kind: 'query',
    description: 'get income filter by date',
    type: contract_dto_1.IncomeByDateType,
    args: {
        data: contract_dto_1.GetByDateInput,
    },
    resolve({ args }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const incomeByDate = yield contractService.getIncomeByDate(args === null || args === void 0 ? void 0 : args.data);
            return incomeByDate;
        });
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
exports.getLoansByDate = graphql_compose_1.schemaComposer.createResolver({
    name: 'getLoansByDate',
    kind: 'query',
    description: 'get loans filter by date',
    type: contract_dto_1.loansByDateType,
    args: {
        data: contract_dto_1.GetByDateInput,
    },
    resolve({ args }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const loansByDate = yield contractService.getLoansByDate(args === null || args === void 0 ? void 0 : args.data);
            return loansByDate;
        });
    },
});
exports.getDefaultPaymentContractsByMonth = graphql_compose_1.schemaComposer.createResolver({
    name: 'getDefaultPaymentByMonth',
    kind: 'query',
    description: 'get payment default contracts filter by month',
    type: contract_dto_1.paymentContractsByMonthType,
    resolve() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const defaultPaymentContractsByMonth = yield contractService.getDefaultPaymentContractsByMonth();
            return defaultPaymentContractsByMonth;
        });
    },
});
exports.getDefaultPaymentContractsByDate = graphql_compose_1.schemaComposer.createResolver({
    name: 'getDefaultPaymentContractsByDate',
    kind: 'query',
    description: 'get default payment contracts filter by date',
    type: contract_dto_1.paymentContractsByDateType,
    args: {
        data: contract_dto_1.GetByDateInput,
    },
    resolve({ args }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const paymentDefaultContractsByDate = yield contractService.getDefaultPaymentContractsByDate(args === null || args === void 0 ? void 0 : args.data);
            return paymentDefaultContractsByDate;
        });
    },
});
exports.getDefaultAndSuccessfulPayment = graphql_compose_1.schemaComposer.createResolver({
    name: 'getDefaultAndSuccessfulPayment',
    kind: 'query',
    description: 'get default and successful payment',
    type: contract_dto_1.indicatorsType,
    resolve() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const defaultAndSuccessfulPayment = yield contractService.indicators();
            return defaultAndSuccessfulPayment;
        });
    },
});
exports.amortization = graphql_compose_1.schemaComposer.createResolver({
    name: 'amortization',
    kind: 'query',
    description: 'get all stages from amortization contracts',
    type: contract_dto_1.amortizationType,
    args: {
        data: contract_dto_1.amortizationInput,
    },
    resolve({ args }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const getAmortization = yield contractService.amortization(args === null || args === void 0 ? void 0 : args.data);
            return getAmortization;
        });
    },
});
exports.contractEarning = graphql_compose_1.schemaComposer.createResolver({
    name: 'contractEarning',
    kind: 'query',
    description: 'get earnings contract for user',
    type: contract_dto_1.GetContractEarningType,
    args: {
        data: contract_dto_1.GetContractEarningInput,
    },
    resolve({ args }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const getAmortization = yield contractService.userEarnings(args === null || args === void 0 ? void 0 : args.data);
            return getAmortization;
        });
    },
});
exports.getMyContracts = graphql_compose_1.schemaComposer.createResolver({
    name: 'getMyContracts',
    kind: 'query',
    description: 'get all contracts for the user logged',
    type: ContractPaginationType,
    args: {
        data: contract_dto_1.GetMyContractsInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const contracts = yield contractService.getMyContracts(args.data, token);
            return contracts;
        });
    },
});
exports.getContractsFilterByStatusByUser = graphql_compose_1.schemaComposer.createResolver({
    name: 'getContractsFilterByStatusByUser',
    kind: 'query',
    description: 'get contracts filtered by status by user',
    type: ContractPaginationType,
    args: {
        data: contract_dto_1.GetContractsFilterByStatusByUserInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const userContracts = yield contractService.getContractsFilterByStatusByUser(args === null || args === void 0 ? void 0 : args.data, token);
            return userContracts;
        });
    },
});
exports.getPreCancelInfo = graphql_compose_1.schemaComposer.createResolver({
    name: 'getPreCancelInfo',
    kind: 'query',
    description: 'get pre-cancel info',
    type: contract_dto_1.GetPreCancelInfoType,
    args: {
        data: contract_dto_1.GetPreCancelInfoInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const info = yield contractService.getPreCancelInfo(args.data, token);
            return info;
        });
    },
});
exports.getUserStats = graphql_compose_1.schemaComposer.createResolver({
    name: 'getUserStats',
    kind: 'query',
    description: 'get user contracts stats',
    type: contract_dto_1.GetUserStatsType,
    args: {
        data: contract_dto_1.UserStatsInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const stats = yield contractService.getUserStats(args === null || args === void 0 ? void 0 : args.data, token);
            return stats;
        });
    },
});
const contractQueries = {
    contract: contract_model_1.ContractTC.mongooseResolvers.findOne(),
    contracts: contract_model_1.ContractTC.mongooseResolvers.findMany({
        limit: { defaultValue: 1000000 },
    }),
    contractPagination: contract_model_1.ContractTC.mongooseResolvers.pagination(),
    totalLoans: contract_model_1.ContractTC.mongooseResolvers.count(),
    totalIncome: exports.totalIncome,
    interestRate: exports.interestRate,
    getContractsFilterByStatus: exports.getContractsFilterByStatus,
    getContractsByStatus: exports.getContractsByStatus,
    getContractsFilterByStatusByClient: exports.getContractsFilterByStatusByClient,
    getTransactionsByLenderOrBorrower: exports.getTransactionsByLenderOrBorrower,
    getIncomeByDate: exports.getIncomeByDate,
    totalIncomes: exports.totalIncomes,
    getLoansByDate: exports.getLoansByDate,
    getDefaultPaymentContractsByMonth: exports.getDefaultPaymentContractsByMonth,
    getDefaultPaymentContractsByDate: exports.getDefaultPaymentContractsByDate,
    getDefaultAndSuccessfulPayment: exports.getDefaultAndSuccessfulPayment,
    amortization: exports.amortization,
    contractEarning: exports.contractEarning,
    getMyContracts: exports.getMyContracts,
    getContractsFilterByStatusByUser: exports.getContractsFilterByStatusByUser,
    getPreCancelInfo: exports.getPreCancelInfo,
    getUserStats: exports.getUserStats,
    getContractInfo: exports.getContractInfo,
};
exports.contractQueries = contractQueries;
const contractMutations = {
    updateContract: contract_model_1.ContractTC.mongooseResolvers.updateOne(),
    createContract: exports.createContract,
    preCancel: exports.preCancel,
    addOriginalValues: exports.addOriginalValues,
};
exports.contractMutations = contractMutations;
// REST Controller
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const contracts = yield contractService.find({});
            return res.status(200).json({ success: true, contracts });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.getAll = getAll;
function getOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const contract = yield contractService.findOne({ _id: req.params._id });
            return res.status(200).json({ success: true, contract });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.getOne = getOne;
function createOne(req, res, next) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const contract = yield contractService.create(req.body, token);
            return res.status(200).json({ success: true, contract });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.createOne = createOne;
function updateOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const contract = yield contractService.updateOne({ _id: req.params._id }, req.body);
            return res.status(200).json({ success: true, contract });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.updateOne = updateOne;
function pagination(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield contractService.pagination(Number(req.params.page), Number(req.params.perPage));
            return res.status(200).json({ success: true, pagination: data });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.pagination = pagination;
function getContractAndCreditScoreDetails(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield contractService.contractAndCreditScoreDetails();
            return res.status(200).json({ success: true });
        }
        catch (error) {
            console.log('Error in get contract and credit score details: ', error);
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.getContractAndCreditScoreDetails = getContractAndCreditScoreDetails;
//# sourceMappingURL=contract.controller.js.map