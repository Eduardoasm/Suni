"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = exports.findOne = exports.updateOne = exports.create = void 0;
const tslib_1 = require("tslib");
const country_model_1 = require("./country.model");
function create(country) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return country_model_1.Country.create(country);
    });
}
exports.create = create;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return country_model_1.Country.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return country_model_1.Country.findOne(filter, projection, options);
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return country_model_1.Country.find(filter, projection, options).exec();
    });
}
exports.find = find;
//# sourceMappingURL=country.service.js.map