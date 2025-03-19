"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const country_controller_1 = require("./country.controller");
const countryRouter = (0, express_1.Router)();
countryRouter.post('/', country_controller_1.getAll);
countryRouter.get('/:_id', country_controller_1.findOne);
countryRouter.post('/create', country_controller_1.create);
countryRouter.post('/updateOne', country_controller_1.updateOne);
exports.default = countryRouter;
//# sourceMappingURL=country.routes.js.map