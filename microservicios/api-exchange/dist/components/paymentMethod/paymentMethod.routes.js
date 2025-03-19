"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentMethod_controller_1 = require("./paymentMethod.controller");
const PaymentMethodRouter = (0, express_1.Router)();
PaymentMethodRouter.post('/v1/paymentMethods/updateMany', paymentMethod_controller_1.updateMany);
exports.default = PaymentMethodRouter;
//# sourceMappingURL=paymentMethod.routes.js.map