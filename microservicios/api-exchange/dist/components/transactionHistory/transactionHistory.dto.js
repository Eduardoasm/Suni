"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionHistoryTypeNotNull = exports.TransactionHistoryTypePlural = exports.TransactionHistoryTypeName = exports.TransactionHistoryType = void 0;
const transactionHistory_model_1 = require("./transactionHistory.model");
exports.TransactionHistoryType = transactionHistory_model_1.TransactionHistoryTC.getType();
exports.TransactionHistoryTypeName = transactionHistory_model_1.TransactionHistoryTC.getTypeName();
exports.TransactionHistoryTypePlural = transactionHistory_model_1.TransactionHistoryTC.getTypePlural().getTypeName();
exports.TransactionHistoryTypeNotNull = transactionHistory_model_1.TransactionHistoryTC.getTypeNonNull().getTypeName();
//# sourceMappingURL=transactionHistory.dto.js.map