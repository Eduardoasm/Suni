"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.userSchema = new mongoose_1.Schema({
    id: {
        type: String,
    },
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
}, {
    timestamps: true,
});
(0, graphql_compose_mongoose_1.convertSchemaToGraphQL)(exports.userSchema, 'User', graphql_compose_1.schemaComposer);
//# sourceMappingURL=user.schema.js.map