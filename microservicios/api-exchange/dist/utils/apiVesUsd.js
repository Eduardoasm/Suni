"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiVesUsd = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const NoSentryError_1 = require("./NoSentryError");
function apiVesUsd() {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const getPriceBtc = yield axios_1.default.get('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-ee983e92-3084-40d6-afe7-3dd5b713b12f/dollar/bcv');
            const priceBtc = (_a = getPriceBtc.data) === null || _a === void 0 ? void 0 : _a.dollar_bcv;
            return Number(priceBtc);
        }
        catch (error) {
            throw new NoSentryError_1.NoSentryError(error);
        }
    });
}
exports.apiVesUsd = apiVesUsd;
//# sourceMappingURL=apiVesUsd.js.map