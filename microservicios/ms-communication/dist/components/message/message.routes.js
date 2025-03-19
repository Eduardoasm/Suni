"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("./message.controller");
const router = (0, express_1.Router)();
router.get('/v1/message', message_controller_1.getAll);
router.post('/v1/message', message_controller_1.createOne);
router.get('/v1/message/pagination/:page/:perPage', message_controller_1.pagination);
router.put('/v1/message/:_id', message_controller_1.updateOne);
router.get('/v1/message/:_id', message_controller_1.getOne);
exports.default = router;
//# sourceMappingURL=message.routes.js.map