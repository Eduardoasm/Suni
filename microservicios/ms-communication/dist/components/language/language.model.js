"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageTC = exports.Language = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const languageSchema = new mongoose_1.Schema({
    code: {
        type: String,
    },
    name: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
exports.Language = (0, mongoose_1.model)('Language', languageSchema);
exports.LanguageTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Language);
//# sourceMappingURL=language.model.js.map