"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsTC = exports.Settings = exports.settingsSchema = void 0;
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const mongoose_1 = require("mongoose");
const credit_score_params_1 = require("../credit-score-params");
const credit_score_range_1 = require("../credit-score-range");
const offer_expiration_schema_1 = require("../offer-expiration/offer-expiration.schema");
const contract_fee_settings_1 = require("../contract-fee-settings");
const contract_settings_1 = require("../contract-settings");
exports.settingsSchema = new mongoose_1.Schema({
    offerExpiration: {
        type: offer_expiration_schema_1.offerExpirationSchema,
    },
    creditScoreParams: [credit_score_params_1.creditScoreParamsSchema],
    creditScoreRange: [credit_score_range_1.creditScoreRangeSchema],
    maxInterestRate: {
        type: Number,
        default: 0,
    },
    minInterestRate: {
        type: Number,
        default: 0,
    },
    contract: contract_settings_1.contractSettingsSchema,
    contractFees: contract_fee_settings_1.contractFeeSettingsSchema,
    active: {
        type: Boolean,
        default: true,
    },
});
exports.Settings = (0, mongoose_1.model)('Settings', exports.settingsSchema);
exports.SettingsTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Settings);
//# sourceMappingURL=settings.model.js.map