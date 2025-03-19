"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditScoreValueSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.creditScoreValueSchema = new mongoose_1.Schema({
    provider: {
        type: String,
    },
    value: {
        type: Number,
    },
    max: {
        type: Number,
    },
}, { timestamps: true });
(0, graphql_compose_mongoose_1.convertSchemaToGraphQL)(exports.creditScoreValueSchema, 'CreditScoreValue', graphql_compose_1.schemaComposer);
//# sourceMappingURL=credit-score-value.schema.js.map