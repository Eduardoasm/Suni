"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loanOffer_controller_1 = require("./loanOffer.controller");
const router = (0, express_1.Router)();
router.get('/v1/loanOffer', loanOffer_controller_1.getAll);
router.get('/v1/loanOffer/pagination/:page/:perPage', loanOffer_controller_1.pagination);
router.get('/v1/loanOffer/:_id', loanOffer_controller_1.getOne);
router.put('/v1/loanOffer/:_id', loanOffer_controller_1.updateOne);
exports.default = router;
//# sourceMappingURL=loanOffer.routes.js.map