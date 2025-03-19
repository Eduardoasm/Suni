"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notification_controller_1 = require("../components/notification/notification.controller");
const messageTemplate_controller_1 = require("../components/messageTemplate/messageTemplate.controller");
const language_controller_1 = require("../components/language/language.controller");
const message_controller_1 = require("../components/message/message.controller");
const Mutation = Object.assign(Object.assign(Object.assign(Object.assign({}, notification_controller_1.notificationMutations), messageTemplate_controller_1.messageTemplateMutations), language_controller_1.languageMutations), message_controller_1.messageMutations);
exports.default = Mutation;
//# sourceMappingURL=Mutation.js.map