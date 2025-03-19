"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commerceRiskParam_controller_1 = require("./commerceRiskParam.controller");
const router = (0, express_1.Router)();
router.get('/v1/commerceRiskParam', commerceRiskParam_controller_1.getAll);
router.post('/v1/commerceRiskParam', commerceRiskParam_controller_1.createOne);
router.get('/v1/commerceRiskParam/pagination/:page/:perPage', commerceRiskParam_controller_1.pagination);
router.get('/v1/commerceRiskParam/:_id', commerceRiskParam_controller_1.getOne);
router.put('/v1/commerceRiskParam/:_id', commerceRiskParam_controller_1.updateOne);
exports.default = router;
//# sourceMappingURL=commerceRiskParam.routes.js.map