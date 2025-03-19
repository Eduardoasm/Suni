"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionHistoryTC = exports.TransactionHistory = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const transactionHistorySchema = new mongoose_1.Schema({
    transaction: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Transaction',
    },
    assetAmount: {
        type: Number,
    },
    currencyAmount: {
        type: Number,
    },
    price: {
        type: Number,
    },
}, { timestamps: true });
exports.TransactionHistory = (0, mongoose_1.model)('TransactionHistory', transactionHistorySchema);
exports.TransactionHistoryTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.TransactionHistory);
//# sourceMappingURL=transactionHistory.model.js.map