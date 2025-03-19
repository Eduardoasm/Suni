"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWAOClient = exports.getUser = exports.pagination = exports.translateUserRole = exports.translateDniType = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const user_model_1 = require("./user.model");
const utils_1 = require("../../../utils");
const NoSentryError_1 = require("../../../utils/NoSentryError");
const userInfo_1 = require("../../../utils/walletService/userInfo");
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return user_model_1.User.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return user_model_1.User.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return user_model_1.User.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function create(user) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return user_model_1.User.create(user);
    });
}
exports.create = create;
function translateDniType(candidate) {
    switch (candidate) {
        case 'V':
            return 'V';
        case 'E':
            return 'E';
        case 'J':
            return 'J';
        case 'G':
            return 'G';
        case 'P':
            return 'P';
        default:
            return 'N/A';
    }
}
exports.translateDniType = translateDniType;
function translateUserRole(candidate) {
    switch (candidate) {
        case 'admin':
            return 'admin';
        case 'superadmin':
            return 'superadmin';
        default:
            return 'admin';
    }
}
exports.translateUserRole = translateUserRole;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, user_model_1.User, filter, projection, options);
    });
}
exports.pagination = pagination;
function getUser(token) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        if (!user) {
            throw new NoSentryError_1.NoSentryError('Not user found');
        }
        if (user && (user === null || user === void 0 ? void 0 : user.metamapStatus)) {
            user.metamapStatus.status = (_a = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _a === void 0 ? void 0 : _a.status.toLowerCase();
        }
        return user;
    });
}
exports.getUser = getUser;
function getWAOClient(clientId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const client = yield axios_1.default.get(`${process.env.SERVICE_URL}/user/${clientId}`, {
            headers: {
                Authorization: `Bearer ${process.env.TOKEN_ADMIN_SUNI}`,
            },
        });
        return client;
    });
}
exports.getWAOClient = getWAOClient;
//# sourceMappingURL=user.service.js.map