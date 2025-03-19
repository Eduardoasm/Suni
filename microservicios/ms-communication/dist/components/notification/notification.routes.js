"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = require("./notification.controller");
const router = (0, express_1.Router)();
router.get('/v1/notification', notification_controller_1.getAll);
router.post('/v1/notification', notification_controller_1.createNotification);
router.get('/v1/notification/pagination/:page/:perPage', notification_controller_1.getAllWithPagination);
router.put('/v1/notification/:_id', notification_controller_1.updateOne);
router.get('/v1/notification/:_id', notification_controller_1.customFindOne);
router.patch('/v1/notification/delete_one/:_id', notification_controller_1.softDeleteNotification);
router.patch('/v1/notification/read_one_notification/:_id', notification_controller_1.readNotification);
router.patch('/v1/notification/read_many_notifications', notification_controller_1.readManyNotification);
exports.default = router;
//# sourceMappingURL=notification.routes.js.map