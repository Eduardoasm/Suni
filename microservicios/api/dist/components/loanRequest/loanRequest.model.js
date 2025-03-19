"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanRequestTC = exports.LoanRequest = exports.loanRequestSchema = void 0;
const tslib_1 = require("tslib");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const mongoose_1 = require("mongoose");
const currency_1 = require("../currency");
const loanOffer_model_1 = require("../loanOffer/loanOffer.model");
exports.loanRequestSchema = new mongoose_1.Schema({
    amountInUSDC: {
        type: Number,
    },
    installments: {
        type: Number,
    },
    timesClicked: {
        type: Number,
        default: 0,
    },
    selectedWallet: {
        type: String,
    },
    borrowerInfo: {
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
        enum: ['active', 'closed', 'canceled', 'expired'],
        default: 'active',
    },
    selectedWalletCurrency: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Currency',
    },
    offers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'LoanOffer',
        },
    ],
    referenceNumber: {
        type: Number,
        unique: true,
    },
    blockId: {
        type: String,
    },
    country: {
        type: String,
    },
    creditScore: {
        type: Number,
    },
    active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.loanRequestSchema.pre('save', function (next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!this.referenceNumber) {
            // Buscar el número de referencia más alto en la colección y sumarle 1
            const highest = yield exports.LoanRequest.findOne().sort('-referenceNumber').exec();
            this.referenceNumber = (highest && highest.referenceNumber + 1) || 100000;
        }
        next();
    });
});
exports.LoanRequest = (0, mongoose_1.model)('LoanRequest', exports.loanRequestSchema);
exports.LoanRequestTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.LoanRequest);
exports.LoanRequestTC.addRelation('selectedWalletCurrency', {
    resolver: () => currency_1.CurrencyTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.selectedWalletCurrency,
    },
    projection: { selectedWalletCurrency: 1 },
});
exports.LoanRequestTC.addRelation('offers', {
    resolver: () => loanOffer_model_1.LoanOfferTC.mongooseResolvers.dataLoaderMany(),
    prepareArgs: {
        _ids: (source) => source.offers,
    },
    projection: { offers: 1 },
});
//# sourceMappingURL=loanRequest.model.js.map