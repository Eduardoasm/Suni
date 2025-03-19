"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const graphql_compose_1 = require("graphql-compose");
const Query_1 = tslib_1.__importDefault(require("./Query"));
const Mutation_1 = tslib_1.__importDefault(require("./Mutation"));
graphql_compose_1.schemaComposer.Query.addFields(Object.assign({}, Query_1.default));
graphql_compose_1.schemaComposer.Mutation.addFields(Object.assign({}, Mutation_1.default));
const schema = graphql_compose_1.schemaComposer.buildSchema();
fs_1.default.writeFileSync(path_1.default.join('./schema.graphql'), graphql_compose_1.schemaComposer.toSDL({ commentDescriptions: true }));
exports.default = schema;
//# sourceMappingURL=schema.js.map