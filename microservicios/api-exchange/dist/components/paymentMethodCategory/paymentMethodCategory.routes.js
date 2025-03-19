"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentMethodCategory_controller_1 = require("./paymentMethodCategory.controller");
const paymentMethodCategoryRouter = (0, express_1.Router)();
paymentMethodCategoryRouter.post('/v1/paymentMethodTypes', paymentMethodCategory_controller_1.getAll);
paymentMethodCategoryRouter.post('/getAllWithCurrency', paymentMethodCategory_controller_1.getAllWithCurrency);
paymentMethodCategoryRouter.get('/v1/paymentMethodTypes/:_id', paymentMethodCategory_controller_1.findOne);
paymentMethodCategoryRouter.post('/v1/paymentMethodTypes/updateMany', paymentMethodCategory_controller_1.updateMany);
paymentMethodCategoryRouter.post('/v1/paymentMethodTypes/delete/:_id', paymentMethodCategory_controller_1.deleteOne);
paymentMethodCategoryRouter.post('/v1/paymentMethodTypes/create', paymentMethodCategory_controller_1.create);
paymentMethodCategoryRouter.post('/v1/paymentMethodTypes/updateOne', paymentMethodCategory_controller_1.updateOne);
exports.default = paymentMethodCategoryRouter;
//# sourceMappingURL=paymentMethodCategory.routes.js.map