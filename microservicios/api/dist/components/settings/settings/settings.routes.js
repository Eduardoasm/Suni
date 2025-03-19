"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settings_controller_1 = require("./settings.controller");
const router = (0, express_1.Router)();
router.get('/v1/settings', settings_controller_1.getAll);
router.post('/v1/settings', settings_controller_1.createOne);
router.get('/v1/settings/pagination/:page/:perPage', settings_controller_1.pagination);
router.get('/v1/settings/:_id', settings_controller_1.getOne);
router.put('/v1/settings/:_id', settings_controller_1.updateOne);
exports.default = router;
//# sourceMappingURL=settings.routes.js.map