"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contract_controller_1 = require("./contract.controller");
const router = (0, express_1.Router)();
router.get('/v1/contracts', contract_controller_1.getAll);
router.post('/v1/contracts', contract_controller_1.createOne);
router.get('/v1/contracts/pagination/:page/:perPage', contract_controller_1.pagination);
router.get('/v1/contracts/:_id', contract_controller_1.getOne);
router.put('/v1/contracts/:_id', contract_controller_1.updateOne);
router.get('/v1/contracts/users/credit-score', contract_controller_1.getContractAndCreditScoreDetails);
exports.default = router;
//# sourceMappingURL=contract.routes.js.map