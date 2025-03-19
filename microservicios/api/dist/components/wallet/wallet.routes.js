"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wallet_controller_1 = require("./wallet.controller");
const router = (0, express_1.Router)();
router.get('/v1/wallets', wallet_controller_1.getAll);
router.post('/v1/wallets', wallet_controller_1.createOne);
router.get('/v1/wallets/pagination/:page/:perPage', wallet_controller_1.pagination);
router.get('/v1/wallets/:_id', wallet_controller_1.getOne);
router.put('/v1/wallets/:_id', wallet_controller_1.updateOne);
exports.default = router;
//# sourceMappingURL=wallet.routes.js.map