"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationMutations = exports.notificationQueries = exports.customFindOne = exports.createNotification = exports.readManyNotification = exports.readNotification = exports.softDeleteNotification = exports.getAllWithPagination = exports.pagination = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const graphql_compose_1 = require("graphql-compose");
const notification_model_1 = require("./notification.model");
const notification_dto_1 = require("./notification.dto");
const utils_1 = require("../../utils");
const notificationService = tslib_1.__importStar(require("./notification.service"));
const notificationPaginationType = (0, utils_1.buildPaginationType)('Notification');
const getNotifications = graphql_compose_1.schemaComposer.createResolver({
    name: 'get notification',
    description: 'get all notifications with filter by module optionally',
    kind: 'query',
    type: notificationPaginationType,
    args: {
        data: notification_dto_1.GetNotificationsInput,
    },
    resolve({ args, context }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = context.req.headers.authorization;
            const notifications = yield notificationService.getNotifications(args === null || args === void 0 ? void 0 : args.data, token);
            return notifications;
        });
    },
});
const deleteNotification = graphql_compose_1.schemaComposer.createResolver({
    name: 'Delete notification',
    description: 'soft delete for one notification',
    kind: 'mutation',
    type: notification_dto_1.NotificationType,
    args: {
        data: notification_dto_1.DeleteNotificationInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const deletedNotification = yield notificationService.softDeleteNotification(args === null || args === void 0 ? void 0 : args.data, token);
            return deletedNotification;
        });
    },
});
const readOneNotification = graphql_compose_1.schemaComposer.createResolver({
    name: 'read notification',
    description: 'read notification',
    kind: 'mutation',
    type: notification_dto_1.NotificationType,
    args: {
        data: notification_dto_1.ReadNotificationInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const notificationRead = yield notificationService.readNotification(args === null || args === void 0 ? void 0 : args.data, token);
            return notificationRead;
        });
    },
});
const readManyNotifications = graphql_compose_1.schemaComposer.createResolver({
    name: 'read many notifications',
    description: 'read many notifications with user token',
    kind: 'mutation',
    type: 'Boolean',
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const notifications = yield notificationService.readManyNotifications(token);
            return notifications;
        });
    },
});
const customCreateNotification = graphql_compose_1.schemaComposer.createResolver({
    name: 'create notification',
    description: 'custom create notification',
    kind: 'mutation',
    type: notification_dto_1.NotificationType,
    args: {
        data: notification_dto_1.CreateNotificationInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const notificationCreated = yield notificationService.customCreateNotification(args === null || args === void 0 ? void 0 : args.data, token);
            return notificationCreated;
        });
    },
});
const customGetOne = graphql_compose_1.schemaComposer.createResolver({
    name: 'custom get one notification',
    description: 'custom get one notification with relation object model',
    kind: 'query',
    type: notification_dto_1.CustomGetOneNotificationType,
    args: {
        data: notification_dto_1.CustomGetOneNotificationInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const notification = yield notificationService.customFindOne(args === null || args === void 0 ? void 0 : args.data, token);
            return notification;
        });
    },
});
const unreadNotification = graphql_compose_1.schemaComposer.createResolver({
    name: 'unread notification',
    description: 'unread notification',
    kind: 'mutation',
    type: notification_dto_1.NotificationType,
    args: {
        data: notification_dto_1.ReadNotificationInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const notificationUnread = yield notificationService.unreadNotification(args === null || args === void 0 ? void 0 : args.data, token);
            return notificationUnread;
        });
    },
});
const notificationQueries = {
    notification: notification_model_1.NotificationTC.mongooseResolvers.findOne(),
    notifications: notification_model_1.NotificationTC.mongooseResolvers.findMany({
        limit: { defaultValue: 1000000 },
    }),
    notificationPagination: notification_model_1.NotificationTC.mongooseResolvers.pagination(),
    getNotifications,
    customGetOne,
};
exports.notificationQueries = notificationQueries;
const notificationMutations = {
    createNotification: notification_model_1.NotificationTC.mongooseResolvers.createOne(),
    updateNotification: notification_model_1.NotificationTC.mongooseResolvers.updateOne(),
    deleteNotification,
    readOneNotification,
    readManyNotifications,
    customCreateNotification,
    unreadNotification,
};
exports.notificationMutations = notificationMutations;
// REST Controller
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const notifications = yield notificationService.find({});
            return res.status(200).json({ success: true, notifications });
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
function getAllWithPagination(req, res, next) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (!((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization)) {
                return res
                    .status(401)
                    .json({ success: false, msg: 'Token not provided' });
            }
            const notifications = yield notificationService.getNotifications({
                page: Number(req.params.page),
                perPage: Number(req.params.perPage),
                module: req.body.module,
            }, req.headers.authorization);
            return res.status(200).json({ success: true, notifications });
        }
        catch (error) {
            return res
                .status(500)
                .json({ err: 'Internal server error', success: false });
        }
    });
}
exports.getAllWithPagination = getAllWithPagination;
function softDeleteNotification(req, res, next) {
    var _a, _b, _c;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (!((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization)) {
                return res
                    .status(401)
                    .json({ success: false, msg: 'Token not provided' });
            }
            const deletedNotification = yield notificationService.softDeleteNotification({
                notificationId: new mongoose_1.default.Types.ObjectId((_b = req.params) === null || _b === void 0 ? void 0 : _b._id),
            }, (_c = req.headers) === null || _c === void 0 ? void 0 : _c.authorization);
            return res.status(200).json({ success: true, deletedNotification });
        }
        catch (error) {
            return res
                .status(500)
                .json({ success: false, err: 'Internal server error' });
        }
    });
}
exports.softDeleteNotification = softDeleteNotification;
function readNotification(req, res, next) {
    var _a, _b, _c;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (!((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization)) {
                return res
                    .status(401)
                    .json({ success: false, msg: 'Token not provided' });
            }
            const notificationRead = yield notificationService.readNotification({
                notificationId: new mongoose_1.default.Types.ObjectId((_b = req.params) === null || _b === void 0 ? void 0 : _b._id),
            }, (_c = req.headers) === null || _c === void 0 ? void 0 : _c.authorization);
            return res.status(200).json({ success: true, notificationRead });
        }
        catch (error) {
            return res
                .status(500)
                .json({ success: false, err: 'Internal server error' });
        }
    });
}
exports.readNotification = readNotification;
function readManyNotification(req, res, next) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (!((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization)) {
                return res
                    .status(401)
                    .json({ success: false, msg: 'Token not provided' });
            }
            const notificationsRead = yield notificationService.readManyNotifications((_b = req.headers) === null || _b === void 0 ? void 0 : _b.authorization);
            return res.status(200).json({ success: true, notificationsRead });
        }
        catch (error) {
            return res
                .status(500)
                .json({ success: false, err: 'Internal server error' });
        }
    });
}
exports.readManyNotification = readManyNotification;
function createNotification(req, res, next) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (!((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization)) {
                return res
                    .status(401)
                    .json({ success: false, msg: 'Token not provided' });
            }
            const notificationCreated = yield notificationService.customCreateNotification({
                messageTemplateId: (_b = req.body) === null || _b === void 0 ? void 0 : _b.messageTemplateId,
                model: (_c = req.body) === null || _c === void 0 ? void 0 : _c.model,
                module: (_d = req.body) === null || _d === void 0 ? void 0 : _d.module,
                object: (_e = req.body) === null || _e === void 0 ? void 0 : _e.object,
                recipientId: (_f = req.body) === null || _f === void 0 ? void 0 : _f.recipientId,
                senderId: (_g = req.body) === null || _g === void 0 ? void 0 : _g.senderId,
                variables: (_h = req.body) === null || _h === void 0 ? void 0 : _h.variables,
            }, (_j = req.headers) === null || _j === void 0 ? void 0 : _j.authorization);
            return res.status(200).json({ success: true, notificationCreated });
        }
        catch (error) {
            return res
                .status(500)
                .json({ success: false, err: 'Internal server error' });
        }
    });
}
exports.createNotification = createNotification;
function customFindOne(req, res, next) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (!((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization)) {
                return res.status(401).json({
                    success: false,
                    msg: 'Token not provided',
                });
            }
            const notification = yield notificationService.customFindOne({
                _id: new mongoose_1.default.Types.ObjectId((_b = req.params) === null || _b === void 0 ? void 0 : _b._id),
            }, req.headers.authorization);
            return res.status(200).json({ success: true, data: notification });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                msg: 'Internal server error',
            });
        }
    });
}
exports.customFindOne = customFindOne;
//# sourceMappingURL=notification.controller.js.map