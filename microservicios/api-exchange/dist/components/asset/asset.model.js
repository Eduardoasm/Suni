"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetTC = exports.Asset = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const assetSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    symbol: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    network: {
        type: String,
        trim: true,
        unique: true,
    },
    decimals: {
        type: Number,
    },
    index: {
        type: Number,
    },
    conversionRateToUsd: {
        type: Number,
    },
}, { timestamps: true });
exports.Asset = (0, mongoose_1.model)('Asset', assetSchema);
exports.AssetTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Asset);
//# sourceMappingURL=asset.model.js.map