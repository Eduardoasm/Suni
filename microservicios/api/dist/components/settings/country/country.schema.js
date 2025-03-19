"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countrySchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.countrySchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    code: {
        type: String,
    },
    flag: {
        type: String,
    },
    active: {
        type: Boolean,
    },
}, { timestamps: false });
(0, graphql_compose_mongoose_1.convertSchemaToGraphQL)(exports.countrySchema, 'Country', graphql_compose_1.schemaComposer);
//# sourceMappingURL=country.schema.js.map