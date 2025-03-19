"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamChatQueries = exports.adminAuthChat = exports.setChannelModerator = exports.streamChatAuth = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const streamChat_dto_1 = require("./streamChat.dto");
const streamChatService = tslib_1.__importStar(require("./streamChat.service"));
// import * as s3Service from './s3.service';
exports.streamChatAuth = graphql_compose_1.schemaComposer.createResolver({
    name: 'streamChatAuth',
    kind: 'query',
    description: 'Authentication with Stream Chat Service',
    type: streamChat_dto_1.StreamChatPayload,
    args: {},
    resolve({ args, context }) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context.req.cookies) === null || _a === void 0 ? void 0 : _a.token) !== null && _b !== void 0 ? _b : (_c = context.req.headers) === null || _c === void 0 ? void 0 : _c.authorization;
            const authToken = yield streamChatService.authChat({ token });
            return {
                token: authToken,
            };
        });
    },
});
function setChannelModerator(req, res, next) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.token;
            const channelId = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b._id;
            const channelModerator = yield streamChatService.setChannelModerator({
                token,
                channelId,
            });
            return res.status(200).json(channelModerator);
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.setChannelModerator = setChannelModerator;
function adminAuthChat(req, res, next) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            console.log('token', token);
            const authToken = yield streamChatService.adminAuthChat({
                token,
            });
            return res.status(200).json({ token: authToken });
        }
        catch (error) {
            console.log(error, 'error at adminAuthChat controller');
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.adminAuthChat = adminAuthChat;
exports.streamChatQueries = {
    streamChatAuth: exports.streamChatAuth,
};
//# sourceMappingURL=streamChat.controller.js.map