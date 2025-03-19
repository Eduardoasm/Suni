"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelNotification = exports.findNotifications = exports.pagination = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("../../utils");
const notification_model_1 = require("./notification.model");
const userInfo_1 = require("../../utils/walletService/userInfo");
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return notification_model_1.Notification.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return notification_model_1.Notification.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return notification_model_1.Notification.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function create(notification, session) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return notification_model_1.Notification.create([notification], { session });
    });
}
exports.create = create;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, notification_model_1.Notification, filter, projection, options);
    });
}
exports.pagination = pagination;
function findNotifications(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const filters = {
            user: user.id,
            active: true,
        };
        const options = {
            sort: {
                createdAt: -1,
            },
        };
        return pagination(body.page, body.perPage, filters, null, options);
    });
}
exports.findNotifications = findNotifications;
// export async function customCreate(notification: INotification, token: string) {
//   const { data: user } = await getUserInfo(token);
//   const userNotification = {
//     ...notification,
//     user: user.id,
//   };
//   return Notification.create(userNotification);
// }
function cancelNotification(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const notification = yield notification_model_1.Notification.findOne({ _id: body._id });
        notification.active = false;
        yield notification.save();
        return notification;
    });
}
exports.cancelNotification = cancelNotification;
//# sourceMappingURL=notification.service.js.map