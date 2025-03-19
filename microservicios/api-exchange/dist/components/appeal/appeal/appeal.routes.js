"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appeal_controller_1 = require("./appeal.controller");
const appealRouter = (0, express_1.Router)();
appealRouter.post('/v1/appeals', appeal_controller_1.getAll);
appealRouter.get('/v1/appeals/:_id', appeal_controller_1.findOne);
appealRouter.post('/v1/appeals/manage_crypto', appeal_controller_1.manageCryptoAdminApi);
exports.default = appealRouter;
//# sourceMappingURL=appeal.routes.js.map