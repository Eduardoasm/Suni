"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.walletSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please enter a name of wallet'],
    },
    address: {
        type: String,
        required: [true, 'Please enter a address of wallet'],
    },
}, {
    timestamps: true,
});
(0, graphql_compose_mongoose_1.convertSchemaToGraphQL)(exports.walletSchema, 'Wallet', graphql_compose_1.schemaComposer);
//# sourceMappingURL=wallet.schema.js.map