"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTC = exports.Message = exports.messageSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const language_model_1 = require("../language/language.model");
exports.messageSchema = new mongoose_1.Schema({
    language: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Language',
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
exports.Message = (0, mongoose_1.model)('Message', exports.messageSchema);
exports.MessageTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Message);
exports.MessageTC.addRelation('language', {
    resolver: () => language_model_1.LanguageTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.language,
    },
    projection: { language: 1 },
});
//# sourceMappingURL=message.model.js.map