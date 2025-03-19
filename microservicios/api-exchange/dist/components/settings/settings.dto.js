"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsTypeNotNull = exports.SettingsTypePlural = exports.SettingsTypeName = exports.SettingsType = void 0;
const settings_model_1 = require("./settings.model");
exports.SettingsType = settings_model_1.SettingsTC.getType();
exports.SettingsTypeName = settings_model_1.SettingsTC.getTypeName();
exports.SettingsTypePlural = settings_model_1.SettingsTC.getTypePlural().getTypeName();
exports.SettingsTypeNotNull = settings_model_1.SettingsTC.getTypeNonNull();
//# sourceMappingURL=settings.dto.js.map