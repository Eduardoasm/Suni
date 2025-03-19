"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMutations = exports.userQueries = exports.webhook = exports.pagination = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = exports.getUser = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const graphql_compose_1 = require("graphql-compose");
const user_model_1 = require("./user.model");
const user_dto_1 = require("./user.dto");
const userService = tslib_1.__importStar(require("./user.service"));
exports.getUser = graphql_compose_1.schemaComposer.createResolver({
    name: 'getUser',
    kind: 'query',
    description: 'get user auth',
    type: user_dto_1.GetUserType,
    resolve({ context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const user = yield userService.getUser(token);
            return user;
        });
    },
});
const userQueries = {
    user: user_model_1.UserTC.mongooseResolvers.findOne(),
    users: user_model_1.UserTC.mongooseResolvers.findMany(),
    userPagination: user_model_1.UserTC.mongooseResolvers.pagination(),
    totalUsers: user_model_1.UserTC.mongooseResolvers.count(),
    getUser: exports.getUser,
};
exports.userQueries = userQueries;
const userMutations = {
    createUser: user_model_1.UserTC.mongooseResolvers.createOne(),
    updateUser: user_model_1.UserTC.mongooseResolvers.updateOne(),
};
exports.userMutations = userMutations;
// REST Controller
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield userService.find({});
            return res.status(200).json({ success: true, users });
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
            const user = yield userService.findOne({
                _id: req.params._id,
            });
            return res.status(200).json({ success: true, user });
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
            const user = yield userService.create(req.body);
            return res.status(200).json({ success: true, user });
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
            const user = yield userService.updateOne({ _id: req.params._id }, req.body);
            return res.status(200).json({ success: true, user });
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
            const data = yield userService.pagination(Number(req.params.page), Number(req.params.perPage));
            return res.status(200).json({ success: true, pagination: data });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.pagination = pagination;
function webhook(req, res, next) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const event = req.body;
            const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const config = {
                method: 'post',
                baseURL: process.env.SERVICE_URL,
                url: `/auth/updateUser`,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            };
            const USER_STATUS = {
                VERIFIED: 'verified',
                REVIEW_NEEDED: 'reviewNeeded',
                REJECTED: 'rejected',
            };
            const USER_VERIFIED = {
                // objeto con las condicionales de los eventos de metamap
                [USER_STATUS.VERIFIED]: () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const status = USER_STATUS.VERIFIED.toUpperCase();
                    const { data } = yield axios_1.default.post(`${config.url}?status=${status}`, null, config);
                    if (!data) {
                        res
                            .status(400)
                            .json({ success: false, error: 'failed to update user' });
                    }
                    return data;
                }),
                [USER_STATUS.REVIEW_NEEDED]: () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const status = USER_STATUS.REVIEW_NEEDED.toUpperCase();
                    const { data } = yield axios_1.default.post(`${config.url}?status=${status}`, null, config);
                    if (!data) {
                        res
                            .status(400)
                            .json({ success: false, error: 'failed to update user' });
                    }
                    return data;
                }),
                [USER_STATUS.REJECTED]: () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const status = USER_STATUS.REJECTED.toUpperCase();
                    const { data } = yield axios_1.default.post(`${config.url}?status=${status}`, null, config);
                    if (!data) {
                        res
                            .status(400)
                            .json({ success: false, error: 'failed to update user' });
                    }
                    return data;
                }),
            };
            if (event === null || event === void 0 ? void 0 : event.identityStatus) {
                // como el webhook nos trae varios eventos, apenas nos indique el status de la verificacion se procede a hacer el cambio
                // de la verificacion de el usuario
                const userStatusHandler = USER_VERIFIED[event.identityStatus];
                yield userStatusHandler();
            }
            res.status(200).send({ success: true, data: 'userUpdate' });
        }
        catch (error) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.webhook = webhook;
//# sourceMappingURL=user.controller.js.map