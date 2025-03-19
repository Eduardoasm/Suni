"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profit_controller_1 = require("./profit.controller");
const router = (0, express_1.Router)();
router.get('/v1/profit', profit_controller_1.getAll);
router.post('/v1/profit', profit_controller_1.createOne);
router.get('/v1/profit/pagination/:page/:perPage', profit_controller_1.pagination);
router.get('/v1/profit/:_id', profit_controller_1.getOne);
router.put('/v1/profit/:_id', profit_controller_1.updateOne);
exports.default = router;
//# sourceMappingURL=profit.routes.js.map