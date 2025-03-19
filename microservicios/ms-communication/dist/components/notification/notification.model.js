"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationTC = exports.Notification = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const messageTemplate_model_1 = require("../messageTemplate/messageTemplate.model");
const message_model_1 = require("../message/message.model");
const notificationSchema = new mongoose_1.Schema({
    message: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'MessageTemplate',
    },
    senderId: {
        type: String,
    },
    senderFirstName: {
        type: String,
    },
    senderLastName: {
        type: String,
    },
    recipientId: {
        type: String,
    },
    model: {
        type: String,
        enum: [
            'loanRequest',
            'loanOffer',
            'contract',
            'listing',
            'transaction',
            'wallet',
        ],
    },
    object: {
        type: String,
    },
    module: {
        type: String,
        enum: ['wallet', 'loans', 'exchange', 'kyc'],
    },
    read: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    receivedMessages: [message_model_1.messageSchema],
}, { timestamps: true });
exports.Notification = (0, mongoose_1.model)('Notification', notificationSchema);
exports.NotificationTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Notification);
exports.NotificationTC.addRelation('message', {
    resolver: () => messageTemplate_model_1.MessageTemplateTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.message,
    },
    projection: { message: 1 },
});
//# sourceMappingURL=notification.model.js.map