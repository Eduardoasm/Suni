"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationTC = exports.Notification = exports.notificationSchema = void 0;
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const mongoose_1 = require("mongoose");
exports.notificationSchema = new mongoose_1.Schema({
    collectionName: {
        type: String,
        enum: ['user', 'creditScore', 'loan', 'contract', 'paymentPlan'],
    },
    user: {
        type: String,
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
    },
    active: {
        type: Boolean,
    },
}, {
    timestamps: true,
});
exports.Notification = (0, mongoose_1.model)('Notification', exports.notificationSchema);
exports.NotificationTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Notification);
//# sourceMappingURL=notification.model.js.map