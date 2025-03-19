"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multimediaSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.multimediaSchema = new mongoose_1.Schema({
    src: {
        type: String,
        trim: true,
    },
    alt: {
        type: String,
        trim: true,
    },
    type: {
        type: String,
    },
}, {
    timestamps: true,
});
(0, graphql_compose_mongoose_1.convertSchemaToGraphQL)(exports.multimediaSchema, 'Multimedia', graphql_compose_1.schemaComposer);
//# sourceMappingURL=multimedia.schema.js.map