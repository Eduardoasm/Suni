"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractSettingsSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.contractSettingsSchema = new mongoose_1.Schema({
    minMonthlyPayments: {
        type: Number,
    },
    maxMonthlyPayments: {
        type: Number,
    },
    maxAccumulatedDebtor: {
        type: Number,
    },
    maxAccumulatedDebtorWithCreditor: {
        type: Number,
    },
    allowedBlocks: {
        type: Number,
    },
    amountOfBlocksAllowed: {
        type: Number,
    },
    templateContent: {
        type: String,
    },
});
(0, graphql_compose_mongoose_1.convertSchemaToGraphQL)(exports.contractSettingsSchema, 'ContractSettings', graphql_compose_1.schemaComposer);
//# sourceMappingURL=contract-settings.schema.js.map