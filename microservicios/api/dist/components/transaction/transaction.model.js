"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionTC = exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const payment_plan_1 = require("../contract/payment-plan");
const transactionSchema = new mongoose_1.Schema({
    contract: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Contract',
    },
    from: {
        type: String,
        required: [true, 'Please insert the user from'],
    },
    to: {
        type: String,
        required: [true, 'Please insert the user to'],
    },
    amount: {
        type: Number,
        required: [true, 'Please insert the amount'],
    },
    lenderFee: {
        type: Number,
        required: [true, 'Please insert the lenderFee'],
    },
    borrowerFee: {
        type: Number,
        required: [true, 'Please insert the borrowerFee'],
    },
    interest: {
        type: Number,
        required: [true, 'Please insert a interest'],
    },
    type: {
        type: String,
        required: [true, 'Please insert a type of transaction'],
        enum: ['investment', 'payment'],
    },
    borrowerCreditLimit: {
        type: Number,
    },
    borrowerDueAmount: {
        type: Number,
    },
    borrowerNextPayment: payment_plan_1.paymentPlanSchema,
    borrowerActiveLoans: {
        type: Number,
    },
    borrowerAverageRate: {
        type: Number,
    },
    borrowedByBorrower: {
        type: Number,
    },
    lenderDueAmount: {
        type: Number,
    },
    lenderNextPayment: payment_plan_1.paymentPlanSchema,
    lenderActiveLoans: {
        type: Number,
    },
    lenderAverageRate: {
        type: Number,
    },
    lendedByLender: {
        type: Number,
    },
    event: {
        type: String,
        enum: ['loanConcluded'],
    },
    isActive: {
        type: Boolean,
    },
    commerce: {
        type: String,
        trim: true,
    },
    commerceInterestEarnings: {
        type: Number,
    },
    commerceIssuedLoans: {
        type: Number,
    },
}, { timestamps: true });
exports.Transaction = (0, mongoose_1.model)('Transaction', transactionSchema);
exports.TransactionTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Transaction);
//# sourceMappingURL=transaction.model.js.map