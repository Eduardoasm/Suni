"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("./transaction.controller");
const transactionsRouter = (0, express_1.Router)();
transactionsRouter.get('/v1/transaction/:_id', transaction_controller_1.customFindOne);
exports.default = transactionsRouter;
//# sourceMappingURL=transaction.routes.js.map