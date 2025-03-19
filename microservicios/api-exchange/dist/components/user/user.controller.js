"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = exports.findOne = void 0;
const tslib_1 = require("tslib");
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const userService = tslib_1.__importStar(require("./user.service"));
function findOne(req, res, next) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userService.findOne((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a._id);
            return res.status(200).json({ user });
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.findOne = findOne;
function findAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield userService.getUsersAPICall();
            return res.status(200).json({ users });
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.findAll = findAll;
//# sourceMappingURL=user.controller.js.map