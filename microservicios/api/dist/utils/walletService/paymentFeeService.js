"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentServiceFee = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const NoSentryError_1 = require("../NoSentryError");
/**
 *
 * @param token token received from app
 * @param walletId wallet user received from app
 * @param fee fee of user for the service
 * @param service service of the fee
 */
function paymentServiceFee(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { token, walletId, fee, service } = body;
        if (!token) {
            throw new NoSentryError_1.NoSentryError('Token not provided');
        }
        const config = {
            method: 'post',
            baseURL: process.env.SERVICE_URL,
            url: `/servicefeepayment`,
            headers: {
                authorization: `Bearer ${token}`,
            },
            data: {
                walletId,
                fee,
                service,
            },
        };
        try {
            const { data } = yield (0, axios_1.default)(config);
            if (!data.success)
                throw new NoSentryError_1.NoSentryError('Error in payment service fee');
            return data;
        }
        catch (error) {
            console.log(error, 'General error in payment service fee');
            throw new NoSentryError_1.NoSentryError(`General error in payment service fee ${error}`);
        }
    });
}
exports.paymentServiceFee = paymentServiceFee;
//# sourceMappingURL=paymentFeeService.js.map