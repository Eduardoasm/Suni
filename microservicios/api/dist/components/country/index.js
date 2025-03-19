"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryRouter = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./country.controller"), exports);
tslib_1.__exportStar(require("./country.dto"), exports);
tslib_1.__exportStar(require("./country.model"), exports);
var country_routes_1 = require("./country.routes");
Object.defineProperty(exports, "countryRouter", { enumerable: true, get: function () { return tslib_1.__importDefault(country_routes_1).default; } });
//# sourceMappingURL=index.js.map