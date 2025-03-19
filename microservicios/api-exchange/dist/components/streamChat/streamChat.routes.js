"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const streamChat_controller_1 = require("./streamChat.controller");
const streamChatRouter = (0, express_1.Router)();
streamChatRouter.get('/v1/streamChat/authToken', streamChat_controller_1.adminAuthChat);
streamChatRouter.post('/v1/streamChat/channel/set_moderator/:_id', streamChat_controller_1.setChannelModerator);
exports.default = streamChatRouter;
//# sourceMappingURL=streamChat.routes.js.map