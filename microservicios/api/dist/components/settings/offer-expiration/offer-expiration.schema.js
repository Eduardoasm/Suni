"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offerExpirationSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.offerExpirationSchema = new mongoose_1.Schema({
    rate: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['minutes', 'hours'],
        default: 'minutes',
    },
});
(0, graphql_compose_mongoose_1.convertSchemaToGraphQL)(exports.offerExpirationSchema, 'OfferExpiration', graphql_compose_1.schemaComposer);
//# sourceMappingURL=offer-expiration.schema.js.map