"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const currency_controller_1 = require("./currency.controller");
const currencyRouter = (0, express_1.Router)();
currencyRouter.get('/v1/currencies', currency_controller_1.getAll);
exports.default = currencyRouter;
//# sourceMappingURL=currency.routes.js.map