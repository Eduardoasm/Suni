"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.get('/v1/users', user_controller_1.getAll);
router.post('/v1/users', user_controller_1.createOne);
router.get('/v1/users/pagination/:page/:perPage', user_controller_1.pagination);
router.get('/v1/users/:_id', user_controller_1.getOne);
router.put('/v1/users/:_id', user_controller_1.updateOne);
exports.default = router;
//# sourceMappingURL=user.routes.js.map