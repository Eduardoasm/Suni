"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.permissionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
    },
    key: {
        type: String,
        trim: true,
    },
    options: [
        {
            type: String,
            enum: ['create', 'read', 'update', 'delete'],
        },
    ],
    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
(0, graphql_compose_mongoose_1.convertSchemaToGraphQL)(exports.permissionSchema, 'Permission', graphql_compose_1.schemaComposer);
//# sourceMappingURL=permission.schema.js.map