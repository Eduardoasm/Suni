"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanOfferTC = exports.LoanOffer = exports.loanOfferSchema = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const currency_1 = require("../currency");
exports.loanOfferSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
    },
    installments: {
        type: Number,
    },
    lender: {
        type: String,
    },
    lenderInfo: {
        name: {
            type: String,
        },
        lastName: {
            type: String,
        },
        country: {
            type: String,
            default: 'VEN',
        },
        dni: {
            type: String,
        },
        email: {
            type: String,
        },
    },
    borrower: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'approved', 'rejected', 'canceled', 'expired'],
        default: 'active',
    },
    currency: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Currency',
    },
    expirationDate: {
        type: Date,
    },
    selectedWallet: {
        type: String,
    },
    interestRate: {
        type: Number,
    },
    referenceNumber: {
        type: Number,
        unique: true,
    },
    blockId: {
        type: String,
    },
    blockedAmountInWalletCurrency: {
        type: Number,
    },
    lenderFeeInUSDC: {
        type: Number,
    },
    lenderFeeInWalletCurrency: {
        type: Number,
    },
    active: {
        type: Boolean,
        default: true,
    },
    referenceNumberOfLoanRequest: {
        type: Number,
    },
}, {
    timestamps: true,
});
exports.loanOfferSchema.pre('save', function (next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!this.referenceNumber) {
            // Buscar el número de referencia más alto en la colección y sumarle 1
            const highest = yield exports.LoanOffer.findOne().sort('-referenceNumber').exec();
            this.referenceNumber = (highest && highest.referenceNumber + 1) || 100000;
        }
        next();
    });
});
exports.LoanOffer = (0, mongoose_1.model)('LoanOffer', exports.loanOfferSchema);
exports.LoanOfferTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.LoanOffer);
exports.LoanOfferTC.addRelation('currency', {
    resolver: () => currency_1.CurrencyTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.currency,
    },
    projection: { currency: 1 },
});
//# sourceMappingURL=loanOffer.model.js.map