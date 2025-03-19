"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("./transaction.controller");
const router = (0, express_1.Router)();
router.get('/v1/transactions', transaction_controller_1.getAll);
router.post('/v1/transactions', transaction_controller_1.createOne);
router.get('/v1/transactions/pagination/:page/:perPage', transaction_controller_1.pagination);
router.get('/v1/transactions/:_id', transaction_controller_1.getOne);
router.put('/v1/transactions/:_id', transaction_controller_1.updateOne);
router.post('/v2/transactions/:borrowerId/:lenderId', transaction_controller_1.createTransaction);
exports.default = router;
//# sourceMappingURL=transaction.routes.js.map