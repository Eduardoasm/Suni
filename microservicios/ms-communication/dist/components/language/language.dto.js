"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageTypeNotNull = exports.LanguageTypePlural = exports.LanguageType = exports.LanguageTypeName = void 0;
const language_model_1 = require("./language.model");
exports.LanguageTypeName = language_model_1.LanguageTC.getTypeName();
exports.LanguageType = language_model_1.LanguageTC.getType();
exports.LanguageTypePlural = language_model_1.LanguageTC.getTypePlural().getTypeName();
exports.LanguageTypeNotNull = language_model_1.LanguageTC.getTypeNonNull();
//# sourceMappingURL=language.dto.js.map