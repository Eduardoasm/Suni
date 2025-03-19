"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionHistoryMutations = exports.transactionHistoryQueries = void 0;
const transactionHistory_model_1 = require("./transactionHistory.model");
const transactionHistoryQueries = {
    transactionHistory: transactionHistory_model_1.TransactionHistoryTC.mongooseResolvers.findOne(),
    transactionHistories: transactionHistory_model_1.TransactionHistoryTC.mongooseResolvers.findMany(),
    transactionHistoryPagination: transactionHistory_model_1.TransactionHistoryTC.mongooseResolvers.pagination(),
    totalTransactionHistory: transactionHistory_model_1.TransactionHistoryTC.mongooseResolvers.count(),
};
exports.transactionHistoryQueries = transactionHistoryQueries;
const transactionHistoryMutations = {
    createTransactionHistory: transactionHistory_model_1.TransactionHistoryTC.mongooseResolvers.createOne(),
    updateTransactionHistory: transactionHistory_model_1.TransactionHistoryTC.mongooseResolvers.updateOne(),
};
exports.transactionHistoryMutations = transactionHistoryMutations;
//# sourceMappingURL=transactionHistory.controller.js.map