"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = exports.translateUserRole = exports.translateDniType = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const user_model_1 = require("./user.model");
const utils_1 = require("../../../utils");
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
//# sourceMappingURL=user.service.js.map