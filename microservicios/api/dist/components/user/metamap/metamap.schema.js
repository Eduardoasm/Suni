"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metamapSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.metamapSchema = new mongoose_1.Schema({
    metamapId: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['unverified', 'verified', 'reviewNeeded', 'rejected'],
        default: 'unverified',
    },
    active: {
        type: Boolean,
    },
}, {
    timestamps: true,
});
(0, graphql_compose_mongoose_1.convertSchemaToGraphQL)(exports.metamapSchema, 'Metamap', graphql_compose_1.schemaComposer);
//# sourceMappingURL=metamap.schema.js.map