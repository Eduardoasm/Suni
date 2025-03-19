"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BestPriceTC = exports.BestPrice = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const currency_1 = require("../currency");
const asset_1 = require("../asset");
const bestPriceSchema = new mongoose_1.Schema({
    currency: {
        type: mongoose_1.Schema.Types.ObjectId,
        model: 'Currency',
    },
    asset: {
        type: mongoose_1.Schema.Types.ObjectId,
        model: 'Asset',
    },
    saleBestPrice: {
        type: Number,
    },
    purchaseBestPrice: {
        type: Number,
    },
}, { timestamps: true });
exports.BestPrice = (0, mongoose_1.model)('BestPrice', bestPriceSchema);
exports.BestPriceTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.BestPrice);
exports.BestPriceTC.addRelation('currency', {
    resolver: () => currency_1.CurrencyTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.currency,
    },
    projection: { currency: 1 },
});
exports.BestPriceTC.addRelation('asset', {
    resolver: () => asset_1.AssetTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.asset,
    },
    projection: { asset: 1 },
});
//# sourceMappingURL=bestPrice.model.js.map