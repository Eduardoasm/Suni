"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const country_controller_1 = require("./country.controller");
const countryRouter = (0, express_1.Router)();
countryRouter.post('/v1/countries', country_controller_1.getAll);
countryRouter.get('/v1/countries/:_id', country_controller_1.findOne);
countryRouter.post('/v1/countries/create', country_controller_1.create);
countryRouter.post('/v1/countries/updateOne', country_controller_1.updateOne);
exports.default = countryRouter;
//# sourceMappingURL=country.routes.js.map