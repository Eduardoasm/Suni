"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unreadNotification = exports.customFindOne = exports.customCreateNotification = exports.readManyNotifications = exports.readNotification = exports.softDeleteNotification = exports.getNotifications = exports.pagination = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const notification_model_1 = require("./notification.model");
const utils_1 = require("../../utils");
const userInfo_1 = require("../../utils/walletService/userInfo");
const messageTemplateService = tslib_1.__importStar(require("../messageTemplate/messageTemplate.service"));
const userInfoWithId_1 = require("../../utils/walletService/userInfoWithId");
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
function create(notification) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return notification_model_1.Notification.create(notification);
    });
}
exports.create = create;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, notification_model_1.Notification, filter, projection, options);
    });
}
exports.pagination = pagination;
function getNotifications(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const filter = {
            recipientId: user === null || user === void 0 ? void 0 : user.id,
            isActive: true,
        };
        if (body === null || body === void 0 ? void 0 : body.module) {
            filter.module = body.module;
        }
        const options = {
            sort: {
                createdAt: -1,
            },
        };
        return (0, utils_1.paginateModel)(body.page, body.perPage, notification_model_1.Notification, filter, {}, options);
    });
}
exports.getNotifications = getNotifications;
function softDeleteNotification(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const filter = {
            _id: body === null || body === void 0 ? void 0 : body.notificationId,
            recipientId: user === null || user === void 0 ? void 0 : user.id,
            isActive: true,
        };
        const update = {
            $set: {
                isActive: false,
            },
        };
        const options = {
            new: true,
        };
        const notification = yield notification_model_1.Notification.findOneAndUpdate(filter, update, options);
        return notification;
    });
}
exports.softDeleteNotification = softDeleteNotification;
// se crea function para read notification, es parecida al soft delete pero
// la idea es separar funcionabilidades
function readNotification(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const filter = {
            _id: body === null || body === void 0 ? void 0 : body.notificationId,
            recipientId: user === null || user === void 0 ? void 0 : user.id,
            read: false,
            isActive: true,
        };
        const update = {
            $set: {
                read: true,
            },
        };
        const options = {
            new: true,
        };
        const notification = yield notification_model_1.Notification.findOneAndUpdate(filter, update, options);
        return notification;
    });
}
exports.readNotification = readNotification;
function readManyNotifications(token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
            const notificationsFound = yield find({
                recipientId: user === null || user === void 0 ? void 0 : user.id,
                active: true,
                read: false,
            });
            yield Promise.all(notificationsFound.map((notification) => updateOne({ _id: notification._id }, { read: true })));
            return true;
        }
        catch (error) {
            console.log('Error in read notifications', error);
            return false;
        }
    });
}
exports.readManyNotifications = readManyNotifications;
function customCreateNotification(body, token) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // se realizara la busqueda de usuario por id y no por token ya que en la lambda
        // no es posible obtener el token de el usuario, y hacemos la busqueda
        // de el usuario por su id y con el admin token
        const { data: user } = yield (0, userInfoWithId_1.getUserInfoWithId)(token, body === null || body === void 0 ? void 0 : body.senderId);
        const messageTemplate = yield messageTemplateService.findOne({
            templateId: body.messageTemplateId,
        });
        if (!messageTemplate) {
            throw new utils_1.NoSentryError('Message template not found');
        }
        if ((body === null || body === void 0 ? void 0 : body.variables) && ((_a = Object.keys(body === null || body === void 0 ? void 0 : body.variables)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            messageTemplate.messages.forEach((message) => {
                // iteramos sobre las variables, pueden haber mas de 1 en el mensaje
                for (const variable of Object.keys(body.variables)) {
                    message.content = message.content.replaceAll(variable, body.variables[variable]);
                }
            });
        }
        const notification = yield notification_model_1.Notification.create({
            message: messageTemplate === null || messageTemplate === void 0 ? void 0 : messageTemplate._id,
            senderId: (_b = user === null || user === void 0 ? void 0 : user.id) !== null && _b !== void 0 ? _b : undefined,
            senderFirstName: (_f = (_e = (_d = (_c = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _c === void 0 ? void 0 : _c.dni_firstName) === null || _d === void 0 ? void 0 : _d.split(' ')[0]) !== null && _e !== void 0 ? _e : user === null || user === void 0 ? void 0 : user.name) !== null && _f !== void 0 ? _f : undefined,
            senderLastName: (_k = (_j = (_h = (_g = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _g === void 0 ? void 0 : _g.dni_lastName) === null || _h === void 0 ? void 0 : _h.split(' ')[0]) !== null && _j !== void 0 ? _j : user === null || user === void 0 ? void 0 : user.lastname) !== null && _k !== void 0 ? _k : undefined,
            recipientId: body === null || body === void 0 ? void 0 : body.recipientId,
            model: body === null || body === void 0 ? void 0 : body.model,
            module: body === null || body === void 0 ? void 0 : body.module,
            read: false,
            object: body === null || body === void 0 ? void 0 : body.object,
            receivedMessages: messageTemplate.messages,
        });
        return notification;
    });
}
exports.customCreateNotification = customCreateNotification;
function customFindOne(body, token) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const notificationFound = yield findOne({
            _id: body._id,
            recipientId: user === null || user === void 0 ? void 0 : user.id,
        });
        if (!notificationFound) {
            throw new utils_1.NoSentryError('Notification not found');
        }
        notificationFound.read = true;
        yield notificationFound.save();
        const requests = {
            contract: `${process.env.LOANS_URL}/api/v1/contracts/${notificationFound.object}`,
            loanRequest: `${process.env.LOANS_URL}/api/v1/loanRequest/${notificationFound.object}`,
            loanOffer: `${process.env.LOANS_URL}/api/v1/loanOffer/${notificationFound.object}`,
            listing: `${process.env.EXCHANGE_URL}/api/v1/listing/${notificationFound.object}`,
            transaction: `${process.env.EXCHANGE_URL}/api/v1/transaction/${notificationFound.object}`,
            wallet: `${process.env.SERVICE_URL}/wallet/${notificationFound.object}`,
        };
        const { data } = yield axios_1.default.get(requests[notificationFound.model], {
            headers: {
                Authorization: notificationFound.model === 'wallet' ? `Bearer ${token}` : null,
            },
        });
        // no se adjunto el relationObject a una nueva propiedad de notification por el schema de graphql
        // para no realizar un nuevo type de notification de graphql
        return {
            notification: notificationFound._doc,
            relationObject: (_a = data[notificationFound.model]) !== null && _a !== void 0 ? _a : data.data,
            // se realiza condicional ?? con la data por que no sabemos como retorna WAU los modelos con los getOne,
            // y en caso de que no sea igual con el nombre de el modelo, retorne la data completa
        };
    });
}
exports.customFindOne = customFindOne;
function unreadNotification(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const filter = {
            _id: body === null || body === void 0 ? void 0 : body.notificationId,
            recipientId: user === null || user === void 0 ? void 0 : user.id,
            read: true,
            isActive: true,
        };
        const update = {
            $set: {
                read: false,
            },
        };
        const options = {
            new: true,
        };
        const notification = yield notification_model_1.Notification.findOneAndUpdate(filter, update, options);
        return notification;
    });
}
exports.unreadNotification = unreadNotification;
//# sourceMappingURL=notification.service.js.map