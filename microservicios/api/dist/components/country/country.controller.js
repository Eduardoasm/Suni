"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryMutations = exports.countryQueries = exports.findOne = exports.getAll = exports.updateOne = exports.create = void 0;
const tslib_1 = require("tslib");
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const country_model_1 = require("./country.model");
const countryService = tslib_1.__importStar(require("./country.service"));
function create(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const newCountry = yield countryService.create(req.body.country);
            return res.status(200).json(newCountry);
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.create = create;
function updateOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const newCountry = yield countryService.updateOne(req.body.filter, req.body.update);
            return res.status(200).json(newCountry);
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.updateOne = updateOne;
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const newCountry = yield countryService.find();
            return res.status(200).json(newCountry);
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.getAll = getAll;
function findOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const newCountry = yield countryService.findOne({
                _id: req.params._id,
            });
            return res.status(200).json(newCountry);
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.findOne = findOne;
const countryMutations = {
    createCountry: country_model_1.CountryTC.mongooseResolvers.createOne(),
    updateCountry: country_model_1.CountryTC.mongooseResolvers.updateOne(),
};
exports.countryMutations = countryMutations;
const countryQueries = {
    country: country_model_1.CountryTC.mongooseResolvers.findOne(),
    countries: country_model_1.CountryTC.mongooseResolvers.findMany(),
    totalCountries: country_model_1.CountryTC.mongooseResolvers.count(),
};
exports.countryQueries = countryQueries;
//# sourceMappingURL=country.controller.js.map