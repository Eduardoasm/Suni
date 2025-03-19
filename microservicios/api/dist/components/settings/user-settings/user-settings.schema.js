"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSettingsSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const country_1 = require("../country");
exports.userSettingsSchema = new mongoose_1.Schema({
    restrictedUser: [country_1.countrySchema],
});
(0, graphql_compose_mongoose_1.convertSchemaToGraphQL)(exports.userSettingsSchema, 'userSettings', graphql_compose_1.schemaComposer);
//# sourceMappingURL=user-settings.schema.js.map