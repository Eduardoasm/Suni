"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionMutations = exports.transactionQueries = exports.createTransaction = exports.pagination = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const transaction_model_1 = require("./transaction.model");
const transactionService = tslib_1.__importStar(require("./transaction.service"));
const transaction_dto_1 = require("./transaction.dto");
const borrowerCreditHistory = graphql_compose_1.schemaComposer.createResolver({
    name: 'borrower graphic of credit history',
    description: 'get graphics for credit limit and credit received of borrower',
    kind: 'query',
    type: transaction_dto_1.borrowerCreditHistoryType,
    resolve({ args, context }) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context === null || context === void 0 ? void 0 : context.req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization;
            const creditHistory = yield transactionService.getBorrowerCreditHistory(token);
            return creditHistory;
        });
    },
});
const lenderCreditHistory = graphql_compose_1.schemaComposer.createResolver({
    name: 'lender graphic of credit history',
    description: 'get lender credit history',
    kind: 'query',
    type: transaction_dto_1.lenderCreditHistoryType,
    args: {
        data: transaction_dto_1.dateTransactionInput,
    },
    resolve({ args, context }) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context === null || context === void 0 ? void 0 : context.req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization;
            const creditHistory = yield transactionService.getLenderCreditHistory(token, (_c = args === null || args === void 0 ? void 0 : args.data) === null || _c === void 0 ? void 0 : _c.date);
            return creditHistory;
        });
    },
});
const transactionQueries = {
    transaction: transaction_model_1.TransactionTC.mongooseResolvers.findOne(),
    transactions: transaction_model_1.TransactionTC.mongooseResolvers.findMany({
        limit: { defaultValue: 1000000 },
    }),
    borrowerCreditHistory,
    lenderCreditHistory,
};
exports.transactionQueries = transactionQueries;
const transactionMutations = {
    updateTransactions: transaction_model_1.TransactionTC.mongooseResolvers.updateOne(),
    createTransaction: transaction_model_1.TransactionTC.mongooseResolvers.createOne(),
};
exports.transactionMutations = transactionMutations;
// REST Controller
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const transactions = yield transactionService.find({});
            return res.status(200).json({ success: true, transactions });
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
            const transaction = yield transactionService.findOne({
                _id: req.params._id,
            });
            return res.status(200).json({ success: true, transaction });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.getOne = getOne;
function createOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const transaction = yield transactionService.create(req.body);
            return res.status(200).json({ success: true, transaction });
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
            const transaction = yield transactionService.updateOne({ _id: req.params._id }, req.body);
            return res.status(200).json({ success: true, transaction });
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
            const data = yield transactionService.pagination(Number(req.params.page), Number(req.params.perPage));
            return res.status(200).json({ success: true, pagination: data });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.pagination = pagination;
function createTransaction(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const transaction = yield transactionService.createTransaction(req.body.transaction, req.params.borrowerId, req.params.lenderId);
            return res.status(200).json({ success: true, transaction });
        }
        catch (error) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.createTransaction = createTransaction;
//# sourceMappingURL=transaction.controller.js.map