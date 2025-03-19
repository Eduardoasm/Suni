"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.sessionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    token: {
        type: String,
        trim: true,
    },
    device: {
        type: String,
        trim: true,
    },
    active: {
        type: Boolean,
    },
}, { timestamps: true });
(0, graphql_compose_mongoose_1.convertSchemaToGraphQL)(exports.sessionSchema, 'Session', graphql_compose_1.schemaComposer);
//# sourceMappingURL=session.schema.js.map