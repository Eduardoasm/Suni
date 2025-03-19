"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsRouter = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./settings.controller"), exports);
tslib_1.__exportStar(require("./settings.dto"), exports);
tslib_1.__exportStar(require("./settings.model"), exports);
var settings_routes_1 = require("./settings.routes");
Object.defineProperty(exports, "settingsRouter", { enumerable: true, get: function () { return tslib_1.__importDefault(settings_routes_1).default; } });
//# sourceMappingURL=index.js.map