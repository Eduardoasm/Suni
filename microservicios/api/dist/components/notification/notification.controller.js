"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationMutations = exports.notificationQueries = exports.pagination = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const notification_model_1 = require("./notification.model");
const notificationService = tslib_1.__importStar(require("./notification.service"));
const utils_1 = require("../../utils");
const notification_dto_1 = require("./notification.dto");
const NotificationPaginationType = (0, utils_1.buildPaginationType)('Notification');
const findNotifications = graphql_compose_1.schemaComposer.createResolver({
    name: 'Findnotifications',
    description: 'Find notifications for user',
    kind: 'query',
    type: NotificationPaginationType,
    args: {
        data: notification_dto_1.GetNotificationsInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const notifications = yield notificationService.findNotifications(args === null || args === void 0 ? void 0 : args.data, token);
            return notifications;
        });
    },
});
const customCreateNotification = graphql_compose_1.schemaComposer.createResolver({
    name: 'CreateNotification',
    description: 'Create notification',
    kind: 'mutation',
    type: notification_dto_1.NotificationType,
    args: {
        data: notification_dto_1.CreateNotificationInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const notifications = yield notificationService.findNotifications(args === null || args === void 0 ? void 0 : args.data, token);
            return notifications;
        });
    },
});
const cancelNotification = graphql_compose_1.schemaComposer.createResolver({
    name: 'CancelNotification',
    description: 'cancel notification',
    kind: 'mutation',
    type: notification_dto_1.NotificationType,
    args: {
        data: notification_dto_1.CancelNotificationInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const notifications = yield notificationService.cancelNotification(args === null || args === void 0 ? void 0 : args.data, token);
            return notifications;
        });
    },
});
const notificationQueries = {
    notification: notification_model_1.NotificationTC.mongooseResolvers.findOne(),
    notifications: notification_model_1.NotificationTC.mongooseResolvers.findMany({
        limit: { defaultValue: 1000000 },
    }),
    notificationPagination: notification_model_1.NotificationTC.mongooseResolvers.pagination(),
    findNotifications,
};
exports.notificationQueries = notificationQueries;
const notificationMutations = {
    updateNotification: notification_model_1.NotificationTC.mongooseResolvers.updateOne(),
    createNotification: notification_model_1.NotificationTC.mongooseResolvers.createOne(),
    customCreateNotification,
    cancelNotification,
};
exports.notificationMutations = notificationMutations;
// REST Controller
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const notification = yield notificationService.find({});
            return res.status(200).json({ success: true, notification });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.getAll = getAll;
function getOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const notification = yield notificationService.findOne({
                _id: req.params._id,
            });
            return res.status(200).json({ success: true, notification });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.getOne = getOne;
function createOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const notification = yield notificationService.create(req.body);
            return res.status(200).json({ success: true, notification });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.createOne = createOne;
function updateOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const notification = yield notificationService.updateOne({ _id: req.params._id }, req.body);
            return res.status(200).json({ success: true, notification });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.updateOne = updateOne;
function pagination(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield notificationService.pagination(Number(req.params.page), Number(req.params.perPage));
            return res.status(200).json({ success: true, pagination: data });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.pagination = pagination;
//# sourceMappingURL=notification.controller.js.map