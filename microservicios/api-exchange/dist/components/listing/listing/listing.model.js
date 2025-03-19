"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingTC = exports.Listing = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const currency_1 = require("../../currency");
const asset_1 = require("../../asset");
const takerConditions_1 = require("../takerConditions");
const paymentMethod_1 = require("../../paymentMethod");
const wallet_1 = require("../../wallet");
const user_schema_1 = require("../../user/user.schema");
const bestPrice_model_1 = require("../../bestPrice/bestPrice.model");
const listingSchema = new mongoose_1.Schema({
    currency: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Currency',
        required: [true, 'Please insert a currency id'],
    },
    asset: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Asset',
        required: [true, 'Please insert an asset id'],
    },
    amount: {
        type: Number,
        required: [true, 'Please insert an amount'],
    },
    price: {
        type: Number,
    },
    priceType: {
        type: String,
        enum: ['fixed', 'dynamic'],
    },
    comments: {
        type: String,
    },
    autoReply: {
        type: String,
    },
    paymentMethods: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'PaymentMethod',
        },
    ],
    maxAmount: {
        type: Number,
        required: [true, 'Please enter the maximum price of the ad'],
    },
    minAmount: {
        type: Number,
        required: [true, 'Please enter the minimum price of the ad'],
    },
    originalMaxAssetAmount: {
        type: Number,
    },
    maxAmountAsset: {
        type: Number,
    },
    minAmountAsset: {
        type: Number,
    },
    type: {
        type: String,
        enum: ['purchase', 'sale'],
        required: [true, 'Please enter the ad type'],
        trim: true,
    },
    maker: {
        type: user_schema_1.userSchema,
        required: [true, 'Please enter the maker'],
    },
    status: {
        type: String,
        enum: ['active', 'taker_assigned', 'canceled', 'default'],
        required: [true, 'Please enter the ad type'],
        trim: true,
    },
    takerConditions: [takerConditions_1.takerConditionsSchema],
    fee: {
        type: Number,
    },
    selectedWallet: wallet_1.walletSchema,
    timeMinutes: {
        type: Number,
        required: [true, 'Please enter a Time for listing'],
    },
    pricePercentage: {
        type: Number,
    },
    loanAdId: {
        type: String,
    },
    transactionsMaker: {
        type: Number,
    },
    transactionsMakerCompleted: {
        type: Number,
    },
    active: {
        type: Boolean,
        default: true,
    },
    bestPricePercentage: {
        type: Number,
    },
    bestPrice: {
        type: mongoose_1.Schema.Types.ObjectId,
        model: 'BestPrice',
    },
    referenceNumber: {
        type: Number,
        unique: true,
    },
    priceReferenceType: {
        type: String,
        enum: ['suni', 'market'],
    },
}, { timestamps: true });
listingSchema.pre('save', function (next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!this.referenceNumber) {
            // Buscar el número de referencia más alto en la colección y sumarle 1
            const highest = yield exports.Listing.findOne().sort('-referenceNumber').exec();
            this.referenceNumber = (highest && highest.referenceNumber + 1) || 100000;
        }
        next();
    });
});
exports.Listing = (0, mongoose_1.model)('Listing', listingSchema);
exports.ListingTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Listing);
exports.ListingTC.addRelation('currency', {
    resolver: () => currency_1.CurrencyTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.currency,
    },
    projection: { currency: 1 },
});
exports.ListingTC.addRelation('asset', {
    resolver: () => asset_1.AssetTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.asset,
    },
    projection: { asset: 1 },
});
exports.ListingTC.addRelation('paymentMethods', {
    resolver: () => paymentMethod_1.PaymentMethodTC.mongooseResolvers.dataLoaderMany(),
    prepareArgs: {
        _ids: (source) => source.paymentMethods,
    },
    projection: { paymentMethods: 1 },
});
exports.ListingTC.addRelation('bestPrice', {
    resolver: () => bestPrice_model_1.BestPriceTC.mongooseResolvers.dataLoader(),
    prepareArgs: {
        _id: (source) => source.bestPrice,
    },
    projection: { bestPrice: 1 },
});
//# sourceMappingURL=listing.model.js.map