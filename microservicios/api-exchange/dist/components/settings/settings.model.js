"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsTC = exports.Settings = exports.settingsSchema = void 0;
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const mongoose_1 = require("mongoose");
exports.settingsSchema = new mongoose_1.Schema({
    makerFee: {
        type: Number,
        required: [true, 'Please enter a maker fee'],
    },
    takerFee: {
        type: Number,
        required: [true, 'Please enter a taker fee'],
    },
    transactionFee: {
        type: Number,
        default: 0,
    },
    transactions: {
        maxAmountAllowed: {
            type: Number,
            default: 0,
        },
        minAmountAllowed: {
            type: Number,
            default: 0,
        },
    },
    btc: {
        minTransAmount: {
            type: Number,
            default: 0.004,
        },
        transBreakPoint: {
            type: Number,
            default: 0.0333,
        },
        cryptoHolderTransFeeUnderBreakPoint: {
            type: {
                type: String,
                enum: ['fixed', 'percentage'],
                default: 'fixed',
            },
            value: {
                type: Number,
                default: 0.0001,
            },
        },
        cryptoHolderServiceFeeUnderBreakPoint: {
            type: {
                type: String,
                enum: ['fixed', 'percentage'],
                default: 'percentage',
            },
            value: {
                type: Number,
                default: 0.5,
            },
        },
        fiatHolderServiceFeeUnderBreakPoint: {
            type: {
                type: String,
                enum: ['fixed', 'percentage'],
                default: 'percentage',
            },
            value: {
                type: Number,
                default: 0.5,
            },
        },
        cryptoHolderTransFeeOverBreakPoint: {
            type: {
                type: String,
                enum: ['fixed', 'percentage'],
                default: 'percentage',
            },
            value: {
                type: Number,
                default: 0.3,
            },
        },
        cryptoHolderServiceFeeOverBreakPoint: {
            type: {
                type: String,
                enum: ['fixed', 'percentage'],
                default: 'percentage',
            },
            value: {
                type: Number,
                default: 0.5,
            },
        },
        fiatHolderServiceFeeOverBreakPoint: {
            type: {
                type: String,
                enum: ['fixed', 'percentage'],
                default: 'percentage',
            },
            value: {
                type: Number,
                default: 0.5,
            },
        },
    },
    active: {
        type: Boolean,
        default: true,
    },
});
exports.Settings = (0, mongoose_1.model)('Settings', exports.settingsSchema);
exports.SettingsTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Settings);
//# sourceMappingURL=settings.model.js.map