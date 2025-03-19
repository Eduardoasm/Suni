"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const creditScore_controller_1 = require("./creditScore.controller");
const router = (0, express_1.Router)();
router.get('/v1/creditScore', creditScore_controller_1.getAll);
router.post('/v1/creditScore', creditScore_controller_1.createOne);
router.get('/v1/creditScore/pagination/:page/:perPage', creditScore_controller_1.pagination);
router.get('/v1/creditScore/:_id', creditScore_controller_1.getOne);
router.put('/v1/creditScore/:_id', creditScore_controller_1.updateOne);
exports.default = router;
//# sourceMappingURL=creditScore.routes.js.map