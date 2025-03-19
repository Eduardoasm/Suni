"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTakerMaker = exports.findOne = exports.getUsersAPICall = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const utils_1 = require("../../utils");
function getUsersAPICall() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield axios_1.default.get(`${process.env.SERVICE_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${process.env.TOKEN_ADMIN_SUNI}`,
                },
            });
            return users.data;
        }
        catch (error) {
            console.log(error, 'ERROR');
            throw new utils_1.NoSentryError(`Error en user service: ${error.message}`);
        }
    });
}
exports.getUsersAPICall = getUsersAPICall;
function findOne(userId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const users = yield getUsersAPICall();
        return users.find((user) => (user === null || user === void 0 ? void 0 : user.id) === userId);
    });
}
exports.findOne = findOne;
function findTakerMaker(takerId, makerId) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const users = yield getUsersAPICall();
        const taker = (_a = users === null || users === void 0 ? void 0 : users.data) === null || _a === void 0 ? void 0 : _a.find((user) => (user === null || user === void 0 ? void 0 : user.id) === takerId);
        const maker = (_b = users === null || users === void 0 ? void 0 : users.data) === null || _b === void 0 ? void 0 : _b.find((user) => (user === null || user === void 0 ? void 0 : user.id) === makerId);
        return { taker, maker };
    });
}
exports.findTakerMaker = findTakerMaker;
//# sourceMappingURL=user.service.js.map