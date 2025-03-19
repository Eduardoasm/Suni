"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionsSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.optionsSchema = new mongoose_1.Schema({
    value: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});
(0, graphql_compose_mongoose_1.convertSchemaToGraphQL)(exports.optionsSchema, 'Options', graphql_compose_1.schemaComposer);
//# sourceMappingURL=options.schema.js.map