"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionTC = exports.Transaction = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const paymentMethod_1 = require("../paymentMethod");
const listing_model_1 = require("../listing/listing/listing.model");
const user_schema_1 = require("../user/user.schema");
const transactionSchema = new mongoose_1.Schema({
    listing: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Listing',
    },
    taker: {
        type: user_schema_1.userSchema,
        required: [true, 'Por favor inserta un user'],
    },
    maker: {
        type: user_schema_1.userSchema,
        required: [true, 'Por favor inserta un user'],
    },
    amount: {
        type: Number,
    },
    status: {
        type: String,
        enum: [
            'pending',
            'payment_executed',
            'payment_received',
            'successful',
            'default',
            'cancelled',
        ],
        default: 'pending',
    },
    appealed: {
        type: Boolean,
        default: false,
    },
    appealedBy: {
        type: user_schema_1.userSchema,
    },
    paymentMethod: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'PaymentMethod',
    },
    referenceNumber: {
        type: Number,
        unique: true,
    },
    selectedWallet: {
        type: String,
    },
    loanAdId: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
    },
    amountUsd: {
        type: Number,
        required: [true, 'Please insert an amount in Usd'],
    },
    makerFee: {
        type: Number,
    },
    takerFee: {
        type: Number,
    },
    fiatAmount: {
        type: Number,
    },
}, { timestamps: true });
transactionSchema.pre('save', function (next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!this.referenceNumber) {
            // Buscar el número de referencia más alto en la colección y sumarle 1
            const highest = yield exports.Transaction.findOne().sort('-referenceNumber').exec();
            this.referenceNumber = (highest && highest.referenceNumber + 1) || 100000;
        }
        next();
    });
});
exports.Transaction = (0, mongoose_1.model)('Transaction', transactionSchema);
exports.TransactionTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Transaction);
exports.TransactionTC.addRelation('paymentMethod', {
    resolver: () => paymentMethod_1.PaymentMethodTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.paymentMethod,
    },
    projection: { paymentMethod: 1 },
});
exports.TransactionTC.addRelation('listing', {
    resolver: () => listing_model_1.ListingTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.listing,
    },
    projection: { listing: 1 },
});
//# sourceMappingURL=transaction.model.js.map