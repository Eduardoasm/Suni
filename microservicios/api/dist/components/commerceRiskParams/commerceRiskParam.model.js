"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommerceRiskParamTC = exports.CommerceRiskParam = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const commerceRiskParamSchema = new mongoose_1.Schema({
    commerce: {
        type: String,
        trim: true,
    },
    withCreditScoring: {
        type: Boolean,
    },
    creditScoreLowerLimit: {
        type: Number,
    },
    creditScoreUpperLimit: {
        type: Number,
    },
    name: {
        type: String,
    },
    installmentsCadence: {
        type: String,
        enum: ['daily', 'weekly', 'biweekly', 'monthly'],
    },
    installments: {
        type: Number,
    },
    minAmountUSD: {
        type: Number,
    },
    maxAmountUSD: {
        type: Number,
    },
    interestRate: {
        type: Number,
    },
    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
exports.CommerceRiskParam = (0, mongoose_1.model)('CommerceRiskParam', commerceRiskParamSchema);
exports.CommerceRiskParamTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.CommerceRiskParam);
//# sourceMappingURL=commerceRiskParam.model.js.map