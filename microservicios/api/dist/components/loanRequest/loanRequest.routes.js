"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loanRequest_controller_1 = require("./loanRequest.controller");
const router = (0, express_1.Router)();
router.get('/v1/loanRequest', loanRequest_controller_1.getAll);
router.post('/v1/loanRequest', loanRequest_controller_1.createOne);
router.get('/v1/loanRequest/pagination/:page/:perPage', loanRequest_controller_1.pagination);
router.get('/v1/loanRequest/:_id', loanRequest_controller_1.getOne);
router.put('/v1/loanRequest/:_id', loanRequest_controller_1.updateOne);
exports.default = router;
//# sourceMappingURL=loanRequest.routes.js.map