"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const history_model_1 = require("./history.model");
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return history_model_1.History.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return history_model_1.History.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return history_model_1.History.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function create(history) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return history_model_1.History.create(history);
    });
}
exports.create = create;
//# sourceMappingURL=history.service.js.map