"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamChatRouter = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./streamChat.controller"), exports);
tslib_1.__exportStar(require("./streamChat.dto"), exports);
var streamChat_routes_1 = require("./streamChat.routes");
Object.defineProperty(exports, "streamChatRouter", { enumerable: true, get: function () { return tslib_1.__importDefault(streamChat_routes_1).default; } });
//# sourceMappingURL=index.js.map