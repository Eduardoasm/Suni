"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTemplateTC = exports.MessageTemplate = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const message_model_1 = require("../message/message.model");
const messageTemplateSchema = new mongoose_1.Schema({
    messages: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Message',
        },
    ],
    templateId: {
        type: String,
        trim: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
messageTemplateSchema.pre('save', function (next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        function generateId() {
            const randomNumber = Math.random();
            const partialId = String(randomNumber).substring(2);
            const fullId = partialId.substring(0, 15);
            return fullId;
        }
        if (!this.templateId) {
            this.templateId = generateId();
        }
        next();
    });
});
exports.MessageTemplate = (0, mongoose_1.model)('MessageTemplate', messageTemplateSchema);
exports.MessageTemplateTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.MessageTemplate);
exports.MessageTemplateTC.addRelation('messages', {
    resolver: () => message_model_1.MessageTC.mongooseResolvers.dataLoaderMany(),
    prepareArgs: {
        _ids: (source) => source.messages,
    },
    projection: { messages: 1 },
});
//# sourceMappingURL=messageTemplate.model.js.map