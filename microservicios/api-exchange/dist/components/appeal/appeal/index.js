"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appealRouter = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./appeal.controller"), exports);
tslib_1.__exportStar(require("./appeal.dto"), exports);
tslib_1.__exportStar(require("./appeal.model"), exports);
var appeal_routes_1 = require("./appeal.routes");
Object.defineProperty(exports, "appealRouter", { enumerable: true, get: function () { return tslib_1.__importDefault(appeal_routes_1).default; } });
//# sourceMappingURL=index.js.map