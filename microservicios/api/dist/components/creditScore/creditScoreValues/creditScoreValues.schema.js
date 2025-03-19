"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditScoreValuesSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.creditScoreValuesSchema = new mongoose_1.Schema({
    referenceNumber: {
        type: String,
    },
    value: {
        type: Number,
    },
    provider: {
        type: String,
        enum: ['credolab', 'suni'],
    },
}, { timestamps: true });
(0, graphql_compose_mongoose_1.convertSchemaToGraphQL)(exports.creditScoreValuesSchema, 'CreditScoreValues', graphql_compose_1.schemaComposer);
//# sourceMappingURL=creditScoreValues.schema.js.map