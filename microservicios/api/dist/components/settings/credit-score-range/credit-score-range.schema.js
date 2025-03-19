"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditScoreRangeSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.creditScoreRangeSchema = new mongoose_1.Schema({
    color: {
        type: String,
        trim: true,
    },
    initial: {
        type: Number,
    },
    final: {
        type: Number,
    },
}, { timestamps: false });
(0, graphql_compose_mongoose_1.convertSchemaToGraphQL)(exports.creditScoreRangeSchema, 'CreditScoreRange', graphql_compose_1.schemaComposer);
//# sourceMappingURL=credit-score-range.schema.js.map