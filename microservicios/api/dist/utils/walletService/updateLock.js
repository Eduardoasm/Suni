"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlock = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const NoSentryError_1 = require("../NoSentryError");
/**
 * @param token token received from app
 * @param amount the new amount for block/listing
 * @param makerFee the new makerFee for maker
 * @param blockId id for service balance lock
 */
function updateBlock(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!body.token) {
            throw new NoSentryError_1.NoSentryError('Token not provided');
        }
        // const date = dayjs();
        // const dateToExpire = date.add(30, 'day');
        // const formatDateToExpire = dateToExpire.format('YYYY-MM-DD HH:mm:ss');
        const config = {
            method: 'patch',
            baseURL: process.env.SERVICE_URL,
            url: `/wallet/block/${body.blockId}`,
            headers: {
                authorization: `Bearer ${body.token}`,
            },
            data: {
                amount: body.amount,
                // expiresAt: formatDateToExpire,  // expires at contract
                serviceFee: body.makerFee,
            },
        };
        const { data } = yield (0, axios_1.default)(config);
        if (!data.success)
            throw new NoSentryError_1.NoSentryError('Error in update listing');
        return data;
    });
}
exports.updateBlock = updateBlock;
//# sourceMappingURL=updateLock.js.map