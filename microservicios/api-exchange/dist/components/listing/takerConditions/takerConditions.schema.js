"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.takerConditionsSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.takerConditionsSchema = new mongoose_1.Schema({
    conditionName: {
        type: String,
    },
    conditionValue: {
        type: String,
    },
}, {
    timestamps: true,
});
(0, graphql_compose_mongoose_1.convertSchemaToGraphQL)(exports.takerConditionsSchema, 'TakerConditions', graphql_compose_1.schemaComposer);
//# sourceMappingURL=takerConditions.schema.js.map