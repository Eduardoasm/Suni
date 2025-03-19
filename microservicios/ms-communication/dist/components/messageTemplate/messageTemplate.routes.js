"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageTemplate_controller_1 = require("./messageTemplate.controller");
const router = (0, express_1.Router)();
router.get('/v1/messageTemplate', messageTemplate_controller_1.getAll);
router.post('/v1/messageTemplate', messageTemplate_controller_1.createOne);
router.post('/v1/messageTemplate/customCreate', messageTemplate_controller_1.customCreateMessageTemplate);
router.get('/v1/messageTemplate/pagination/:page/:perPage', messageTemplate_controller_1.pagination);
router.put('/v1/messageTemplate/:_id', messageTemplate_controller_1.updateOne);
router.get('/v1/messageTemplate/:_id', messageTemplate_controller_1.getOne);
exports.default = router;
//# sourceMappingURL=messageTemplate.routes.js.map