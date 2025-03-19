"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = require("./notification.controller");
const router = (0, express_1.Router)();
router.get('/v1/notification', notification_controller_1.getAll);
router.post('/v1/notification', notification_controller_1.createOne);
router.get('/v1/notification/pagination/:page/:perPage', notification_controller_1.pagination);
router.get('/v1/notification/:_id', notification_controller_1.getOne);
router.put('/v1/notification/:_id', notification_controller_1.updateOne);
exports.default = router;
//# sourceMappingURL=notification.routes.js.map