"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryTypeNotNull = exports.HistoryTypePlural = exports.HistoryType = exports.HistoryTypeName = void 0;
const history_model_1 = require("./history.model");
exports.HistoryTypeName = history_model_1.HistoryTC.getTypeName();
exports.HistoryType = history_model_1.HistoryTC.getType();
exports.HistoryTypePlural = history_model_1.HistoryTC.getTypePlural().getTypeName();
exports.HistoryTypeNotNull = history_model_1.HistoryTC.getTypeNonNull();
//# sourceMappingURL=history.dto.js.map