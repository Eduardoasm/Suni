"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTypeNotNull = exports.MessageTypePlural = exports.MessageType = exports.MessageTypeName = void 0;
const message_model_1 = require("./message.model");
exports.MessageTypeName = message_model_1.MessageTC.getTypeName();
exports.MessageType = message_model_1.MessageTC.getType();
exports.MessageTypePlural = message_model_1.MessageTC.getTypePlural().getTypeName();
exports.MessageTypeNotNull = message_model_1.MessageTC.getTypeNonNull();
//# sourceMappingURL=message.dto.js.map