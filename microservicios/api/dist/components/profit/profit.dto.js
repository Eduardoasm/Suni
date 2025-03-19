"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfitTypeNotNull = exports.ProfitTypePlural = exports.ProfitType = exports.ProfitTypeName = void 0;
const profit_model_1 = require("./profit.model");
exports.ProfitTypeName = profit_model_1.ProfitTC.getTypeName();
exports.ProfitType = profit_model_1.ProfitTC.getType();
exports.ProfitTypePlural = profit_model_1.ProfitTC.getTypePlural().getTypeName();
exports.ProfitTypeNotNull = profit_model_1.ProfitTC.getTypeNonNull();
//# sourceMappingURL=profit.dto.js.map