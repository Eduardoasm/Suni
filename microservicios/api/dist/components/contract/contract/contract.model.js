"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractTC = exports.Contract = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const currency_1 = require("../../currency");
const payment_plan_1 = require("../payment-plan");
const loanRequest_1 = require("../../loanRequest");
const loanOffer_model_1 = require("../../loanOffer/loanOffer.model");
const contractSchema = new mongoose_1.Schema({
    loanRequest: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'LoanRequest',
    },
    loanOffer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'LoanOffer',
    },
    lender: {
        type: String, // Ref to user in SUNI
    },
    borrower: {
        type: String, // Ref to user in SUNI
    },
    walletTransactionsCurrency: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Currency',
    },
    amountInUSDC: {
        type: Number,
    },
    amountReceivedInWalletTransactionsCurrency: {
        type: Number,
    },
    rate: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['active', 'concluded'],
        default: 'active',
    },
    paymentPlan: [payment_plan_1.paymentPlanSchema],
    startDate: {
        type: Date,
    },
    lenderFeeInUSDC: {
        type: Number,
    },
    lenderFeeInWalletTransactionsCurrency: {
        type: Number,
    },
    borrowerFeeInUSDC: {
        type: Number,
    },
    borrowerFeeInWalletTransactionsCurrency: {
        type: Number,
    },
    referenceNumber: {
        type: Number,
        unique: true,
    },
    onDefault: {
        type: Boolean,
        default: false,
    },
    paymentDue: {
        type: Boolean,
        default: false,
    },
    preCancel: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: true,
    },
    commerce: {
        type: String,
        trim: true,
    },
    borrowerSelectedWallet: {
        type: String,
        trim: true,
    },
    lenderSelectedWallet: {
        type: String,
        trim: true,
    },
}, { timestamps: true });
contractSchema.pre('save', function (next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!this.referenceNumber) {
            // Buscar el número de referencia más alto en la colección y sumarle 1
            const highest = yield exports.Contract.findOne().sort('-referenceNumber').exec();
            this.referenceNumber = (highest && highest.referenceNumber + 1) || 100000;
        }
        next();
    });
});
exports.Contract = (0, mongoose_1.model)('Contract', contractSchema);
exports.ContractTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Contract);
exports.ContractTC.addRelation('walletTransactionsCurrency', {
    resolver: () => currency_1.CurrencyTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.walletTransactionsCurrency,
    },
    projection: { walletTransactionsCurrency: 1 },
});
exports.ContractTC.addRelation('loanRequest', {
    resolver: () => loanRequest_1.LoanRequestTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.loanRequest,
    },
    projection: { loanRequest: 1 },
});
exports.ContractTC.addRelation('loanOffer', {
    resolver: () => loanOffer_model_1.LoanOfferTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.loanOffer,
    },
    projection: { loanOffer: 1 },
});
//# sourceMappingURL=contract.model.js.map