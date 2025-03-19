"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceLock = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const NoSentryError_1 = require("../NoSentryError");
/**
 *
 * @param token token received from app
 * @param wallet wallet received from app
 * @param amount amount of listing
 * @param makerFee fee of maker
 */
function balanceLock(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!body.token) {
            throw new NoSentryError_1.NoSentryError('Token not provided');
        }
        const date = (0, dayjs_1.default)();
        const dateToExpire = date.add(30, 'day');
        const formatDateToExpire = dateToExpire.format('YYYY-MM-DD HH:mm:ss');
        const config = {
            method: 'post',
            baseURL: process.env.SERVICE_URL,
            url: `/wallet/block/${body.wallet}`,
            headers: {
                authorization: `Bearer ${body.token}`,
            },
            data: {
                amount: body.amount,
                expiresAt: formatDateToExpire,
                service: 'p2pexchange',
                serviceFee: body.makerFee,
            },
        };
        try {
            const { data } = yield (0, axios_1.default)(config);
            if (!data.success)
                throw new NoSentryError_1.NoSentryError('Error blocking amount in wallet');
            return data;
        }
        catch (error) {
            console.log(error, 'Error blocking amount in wallet');
            throw new NoSentryError_1.NoSentryError(`Error blocking amount in wallet: ${error}`);
        }
    });
}
exports.balanceLock = balanceLock;
//# sourceMappingURL=userBalanceLock.js.map