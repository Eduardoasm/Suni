"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceTokenSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.deviceTokenSchema = new mongoose_1.Schema({
    token: {
        type: String,
    },
    timestamps: {
        type: Date,
    },
}, {
    timestamps: false,
});
(0, graphql_compose_mongoose_1.convertSchemaToGraphQL)(exports.deviceTokenSchema, 'DeviceToken', graphql_compose_1.schemaComposer);
//# sourceMappingURL=deviceToken.schema.js.map