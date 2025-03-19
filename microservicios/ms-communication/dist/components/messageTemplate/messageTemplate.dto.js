"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTemplateTypeNotNull = exports.MessageTemplateTypePlural = exports.MessageTemplateType = exports.MessageTemplateTypeName = void 0;
const messageTemplate_model_1 = require("./messageTemplate.model");
exports.MessageTemplateTypeName = messageTemplate_model_1.MessageTemplateTC.getTypeName();
exports.MessageTemplateType = messageTemplate_model_1.MessageTemplateTC.getType();
exports.MessageTemplateTypePlural = messageTemplate_model_1.MessageTemplateTC.getTypePlural().getTypeName();
exports.MessageTemplateTypeNotNull = messageTemplate_model_1.MessageTemplateTC.getTypeNonNull();
//# sourceMappingURL=messageTemplate.dto.js.map