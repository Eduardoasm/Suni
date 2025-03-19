"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyRouter = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./currency.controller"), exports);
tslib_1.__exportStar(require("./currency.dto"), exports);
tslib_1.__exportStar(require("./currency.model"), exports);
var currency_routes_1 = require("./currency.routes");
Object.defineProperty(exports, "currencyRouter", { enumerable: true, get: function () { return tslib_1.__importDefault(currency_routes_1).default; } });
//# sourceMappingURL=index.js.map