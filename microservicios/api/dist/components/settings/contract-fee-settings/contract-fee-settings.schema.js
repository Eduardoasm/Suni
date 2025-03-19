"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractFeeSettingsSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.contractFeeSettingsSchema = new mongoose_1.Schema({
    moraFee: {
        value: {
            type: Number,
        },
        type: {
            type: String,
            enum: ['fixed', 'percentage'],
        },
    },
    lenderFee: {
        value: {
            type: Number,
        },
        type: {
            type: String,
            enum: ['fixed', 'percentage'],
        },
    },
    borrowerFee: {
        value: {
            type: Number,
        },
        type: {
            type: String,
            enum: ['fixed', 'percentage'],
        },
    },
    borrowerRequestFee: {
        value: {
            type: Number,
        },
        type: {
            type: String,
            enum: ['fixed', 'percentage'],
        },
    },
});
(0, graphql_compose_mongoose_1.convertSchemaToGraphQL)(exports.contractFeeSettingsSchema, 'ContractFeeSettings', graphql_compose_1.schemaComposer);
//# sourceMappingURL=contract-fee-settings.schema.js.map