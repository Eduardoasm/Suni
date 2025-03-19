"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiPriceBtc = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const NoSentryError_1 = require("./NoSentryError");
function apiPriceBtc() {
    var _a, _b, _c, _d, _e;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const getPriceBtc = yield axios_1.default.get(`${process.env.SERVICE_URL}/btc/price-btc`);
            const prices = (_d = (_c = (_b = (_a = getPriceBtc.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.prices) === null || _d === void 0 ? void 0 : _d.filter((price) => price.exchange === 'bitfinex');
            return (_e = prices === null || prices === void 0 ? void 0 : prices[0]) === null || _e === void 0 ? void 0 : _e.price;
        }
        catch (error) {
            console.log(error, 'Error getting btc price');
            throw new NoSentryError_1.NoSentryError(`Error in get price btc ${error}`);
        }
    });
}
exports.apiPriceBtc = apiPriceBtc;
//# sourceMappingURL=apiPriceBtc.js.map