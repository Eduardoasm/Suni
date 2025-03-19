"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notification_controller_1 = require("../components/notification/notification.controller");
const messageTemplate_controller_1 = require("../components/messageTemplate/messageTemplate.controller");
const language_controller_1 = require("../components/language/language.controller");
const message_controller_1 = require("../components/message/message.controller");
const Query = Object.assign(Object.assign(Object.assign(Object.assign({}, notification_controller_1.notificationQueries), messageTemplate_controller_1.messageTemplateQueries), language_controller_1.languageQueries), message_controller_1.messageQueries);
exports.default = Query;
//# sourceMappingURL=Query.js.map