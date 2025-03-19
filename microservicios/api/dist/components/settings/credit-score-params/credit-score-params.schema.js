"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditScoreParamsSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.creditScoreParamsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
    },
    value: {
        type: Number,
    },
}, { timestamps: false });
(0, graphql_compose_mongoose_1.convertSchemaToGraphQL)(exports.creditScoreParamsSchema, 'CreditScoreParams', graphql_compose_1.schemaComposer);
//# sourceMappingURL=credit-score-params.schema.js.map