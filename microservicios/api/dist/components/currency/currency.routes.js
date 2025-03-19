"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const currency_controller_1 = require("./currency.controller");
const router = (0, express_1.Router)();
router.get('/v1/currencies', currency_controller_1.getAll);
router.post('/v1/currencies', currency_controller_1.createOne);
router.get('/v1/currencies/pagination/:page/:perPage', currency_controller_1.pagination);
router.get('/v1/currencies/:_id', currency_controller_1.getOne);
router.put('/v1/currencies/:_id', currency_controller_1.updateOne);
exports.default = router;
//# sourceMappingURL=currency.routes.js.map