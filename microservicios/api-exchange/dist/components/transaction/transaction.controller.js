"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionMutations = exports.transactionQueries = exports.customFindOne = exports.getTransactionsUser = exports.getInProgressTransactions = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const transaction_model_1 = require("./transaction.model");
const transactionService = tslib_1.__importStar(require("./transaction.service"));
const transaction_dto_1 = require("./transaction.dto");
exports.getInProgressTransactions = graphql_compose_1.schemaComposer.createResolver({
    name: 'getInProgressTransactions',
    kind: 'query',
    description: 'get in progress transactions for user',
    type: transaction_dto_1.InProgressTransactionType,
    args: {},
    resolve({ args, context }) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context.req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization;
            const transactions = yield transactionService.getInProgressTransactions(token);
            return transactions;
        });
    },
});
exports.getTransactionsUser = graphql_compose_1.schemaComposer.createResolver({
    name: 'getTransactionsUser',
    kind: 'query',
    description: 'get in transactions user',
    type: transaction_dto_1.TransactionPaginationType,
    args: {
        data: transaction_dto_1.GetTransactionUserInput,
    },
    resolve({ args, context }) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context.req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization;
            const transactions = yield transactionService.getTransactionUser(args === null || args === void 0 ? void 0 : args.data, token);
            return transactions;
        });
    },
});
const createTransaction = graphql_compose_1.schemaComposer.createResolver({
    name: 'createTransaction',
    kind: 'mutation',
    description: 'create a transaction',
    type: transaction_dto_1.TransactionType,
    args: {
        data: transaction_dto_1.CreateTransactionInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const transaction = yield transactionService.create(args === null || args === void 0 ? void 0 : args.data, token);
            return transaction;
        });
    },
});
const cancelTransaction = graphql_compose_1.schemaComposer.createResolver({
    name: 'cancelTransaction',
    kind: 'mutation',
    description: 'cancel a transaction',
    type: transaction_dto_1.TransactionType,
    args: {
        data: transaction_dto_1.CancelTransactionInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const transaction = yield transactionService.cancel(args === null || args === void 0 ? void 0 : args.data, token);
            return transaction;
        });
    },
});
const notifyPayment = graphql_compose_1.schemaComposer.createResolver({
    name: 'notifyPayment',
    kind: 'mutation',
    description: 'notify payment done to maker',
    type: transaction_dto_1.TransactionType,
    args: {
        data: transaction_dto_1.NotifyPaymentInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const transaction = yield transactionService.notifyPayment(args === null || args === void 0 ? void 0 : args.data, token);
            return transaction;
        });
    },
});
const releaseCrypto = graphql_compose_1.schemaComposer.createResolver({
    name: 'releaseCrypto',
    kind: 'mutation',
    description: 'release transaction crypto amount to buyer',
    type: transaction_dto_1.TransactionType,
    args: {
        data: transaction_dto_1.ReleaseCryptoInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const transaction = yield transactionService.releaseCrypto(args === null || args === void 0 ? void 0 : args.data, token);
            return transaction;
        });
    },
});
const getFee = graphql_compose_1.schemaComposer.createResolver({
    name: 'getFee',
    kind: 'query',
    description: 'get total fee amount for a specific transaction amount',
    type: transaction_dto_1.GetFeeType,
    args: {
        data: transaction_dto_1.GetFeeInput,
    },
    resolve({ args }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fee = yield transactionService.getFee(args === null || args === void 0 ? void 0 : args.data);
            return fee;
        });
    },
});
const transactionQueries = {
    transaction: transaction_model_1.TransactionTC.mongooseResolvers.findOne(),
    transactions: transaction_model_1.TransactionTC.mongooseResolvers.findMany(),
    transactionPagination: transaction_model_1.TransactionTC.mongooseResolvers.pagination(),
    totalTransactions: transaction_model_1.TransactionTC.mongooseResolvers.count(),
    getInProgressTransactions: exports.getInProgressTransactions,
    getTransactionsUser: exports.getTransactionsUser,
    getFee,
};
exports.transactionQueries = transactionQueries;
const transactionMutations = {
    updateTransaction: transaction_model_1.TransactionTC.mongooseResolvers.updateOne(),
    createTransaction,
    cancelTransaction,
    notifyPayment,
    releaseCrypto,
};
exports.transactionMutations = transactionMutations;
function customFindOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const transaction = yield transactionService.customFindOne({
                _id: req.params._id,
            });
            return res.status(200).json({ success: true, transaction });
        }
        catch (error) {
            return res
                .status(500)
                .json({ success: false, msg: 'Internal server error ' });
        }
    });
}
exports.customFindOne = customFindOne;
//# sourceMappingURL=transaction.controller.js.map