"use strict";
/* eslint-disable import/no-extraneous-dependencies */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChannel = exports.setChannelModerator = exports.createChannel = exports.getChannelById = exports.adminAuthChat = exports.authChat = void 0;
const tslib_1 = require("tslib");
const stream_chat_1 = require("stream-chat");
const axios_1 = tslib_1.__importDefault(require("axios"));
const userWau_1 = require("../../utils/walletService/userWau");
const NoSentryError_1 = require("../../utils/NoSentryError");
function authChat(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { token } = body;
        const { data: user } = yield (0, userWau_1.getUser)(token);
        const serverClient = stream_chat_1.StreamChat.getInstance(process.env.STREAM_CHAT_API_KEY, process.env.STREAM_CHAT_SECRET);
        const chatToken = serverClient.createToken(user.id);
        return chatToken;
    });
}
exports.authChat = authChat;
function adminAuthChat(body) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { token } = body;
        const { data } = yield axios_1.default.get(`${process.env.LOANS_API_BASE_URL}/auth/current-user`, {
            headers: {
                Authorization: token,
            },
        });
        const serverClient = stream_chat_1.StreamChat.getInstance(process.env.STREAM_CHAT_API_KEY, process.env.STREAM_CHAT_SECRET);
        console.log(data, 'data from api current user');
        const chatToken = serverClient.createToken((_b = (_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id);
        return chatToken;
    });
}
exports.adminAuthChat = adminAuthChat;
function getChannelById(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const serverClient = stream_chat_1.StreamChat.getInstance(process.env.STREAM_CHAT_API_KEY, process.env.STREAM_CHAT_SECRET);
            const filter = { type: 'messaging', id: body.channelId };
            const channels = yield serverClient.queryChannels(filter, {}, {
                watch: false,
                state: true,
            });
            return channels[0];
        }
        catch (error) {
            throw new NoSentryError_1.NoSentryError(`Error in get channel: ${error}`);
        }
    });
}
exports.getChannelById = getChannelById;
function createChannel(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const serverClient = stream_chat_1.StreamChat.getInstance(process.env.STREAM_CHAT_API_KEY, process.env.STREAM_CHAT_SECRET);
            yield serverClient.upsertUsers([{ id: body.maker }, { id: body.taker }]);
            const channel = serverClient.channel('messaging', body.channelId, {
                name: body.channelId,
                members: [body.maker, body.taker],
                created_by_id: body.taker,
            });
            yield channel.create();
            return channel;
        }
        catch (error) {
            console.log('Error in create channel');
            throw new NoSentryError_1.NoSentryError(`Error in create channel: ${error.title}`);
        }
    });
}
exports.createChannel = createChannel;
function setChannelModerator(body) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const channel = yield getChannelById({
                channelId: body === null || body === void 0 ? void 0 : body.channelId,
            });
            const { data } = yield axios_1.default.get(`${process.env.LOANS_API_BASE_URL}/auth/current-user`, {
                headers: {
                    Authorization: body === null || body === void 0 ? void 0 : body.token,
                },
            });
            console.log(data, 'data in setChannelModerator');
            const moderator = yield channel.queryMembers({ is_moderator: true });
            if (((_a = moderator === null || moderator === void 0 ? void 0 : moderator.members) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
                ((_b = moderator === null || moderator === void 0 ? void 0 : moderator.members[0]) === null || _b === void 0 ? void 0 : _b.user_id) === ((_d = (_c = data === null || data === void 0 ? void 0 : data.user) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d._id)) {
                yield channel.demoteModerators([(_e = moderator === null || moderator === void 0 ? void 0 : moderator.members[0]) === null || _e === void 0 ? void 0 : _e.user_id]);
                yield channel.addModerators([(_g = (_f = data === null || data === void 0 ? void 0 : data.user) === null || _f === void 0 ? void 0 : _f.user) === null || _g === void 0 ? void 0 : _g._id], {
                    text: 'Suni support joined the channel.',
                    user_id: (_j = (_h = data === null || data === void 0 ? void 0 : data.user) === null || _h === void 0 ? void 0 : _h.user) === null || _j === void 0 ? void 0 : _j._id,
                    name: 'Suni Support',
                });
                return {
                    channelId: body === null || body === void 0 ? void 0 : body.channelId,
                    message: 'Moderator updated successfully',
                    success: true,
                };
            }
            if (((_k = moderator === null || moderator === void 0 ? void 0 : moderator.members) === null || _k === void 0 ? void 0 : _k.length) === 0) {
                yield channel.addModerators([(_m = (_l = data === null || data === void 0 ? void 0 : data.user) === null || _l === void 0 ? void 0 : _l.user) === null || _m === void 0 ? void 0 : _m._id], {
                    text: 'Suni support joined the channel.',
                    user_id: (_p = (_o = data === null || data === void 0 ? void 0 : data.user) === null || _o === void 0 ? void 0 : _o.user) === null || _p === void 0 ? void 0 : _p._id,
                    name: 'Suni Support',
                });
            }
            return {
                channelId: body === null || body === void 0 ? void 0 : body.channelId,
                message: 'Chat moderator online',
                success: true,
            };
        }
        catch (err) {
            return {
                channelId: body === null || body === void 0 ? void 0 : body.channelId,
                message: 'Error adding the chat moderator',
                errorMessage: err.message,
                success: false,
            };
        }
    });
}
exports.setChannelModerator = setChannelModerator;
function deleteChannel(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const channel = yield getChannelById(body);
            yield channel.delete();
        }
        catch (error) {
            console.log('Error in delete channel');
            throw new NoSentryError_1.NoSentryError('Error in delete channel');
        }
    });
}
exports.deleteChannel = deleteChannel;
//# sourceMappingURL=streamChat.service.js.map