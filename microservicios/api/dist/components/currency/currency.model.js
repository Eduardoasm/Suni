"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyTC = exports.Currency = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const currencySchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    symbol: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
});
exports.Currency = (0, mongoose_1.model)('Currency', currencySchema);
exports.CurrencyTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Currency);
//# sourceMappingURL=currency.model.js.map