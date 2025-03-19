"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectOffers = void 0;
const tslib_1 = require("tslib");
const cancelAd_1 = require("./walletService/cancelAd");
const loanOfferService = tslib_1.__importStar(require("../components/loanOffer/loanOffer.service"));
const sendNotification_1 = require("./pushNotifications/sendNotification");
function rejectOffers(loanRequest, token, loanOffer, session) {
    return loanRequest === null || loanRequest === void 0 ? void 0 : loanRequest.offers.reduce((promises, offer) => {
        if ((offer === null || offer === void 0 ? void 0 : offer._id.toString()) !== (loanOffer === null || loanOffer === void 0 ? void 0 : loanOffer._id.toString()) &&
            offer.status === 'active') {
            const paramsPush = {
                token,
                userId: offer.lender,
                title: 'Oferta no aprobada',
                message: `Tu oferta ${offer.referenceNumber} no ha sido aprobada`,
            };
            const deleteOfferBlock = (0, cancelAd_1.deleteBlock)(token, offer.blockId);
            const pushRejected = (0, sendNotification_1.sendNotifications)(paramsPush);
            const rejectOffer = loanOfferService.findOneAndUpdate({ _id: offer._id }, {
                status: 'rejected',
            }, { session });
            promises.push(Promise.all([deleteOfferBlock, rejectOffer, pushRejected]));
        }
        return promises;
    }, []);
}
exports.rejectOffers = rejectOffers;
//# sourceMappingURL=rejectOffers.js.map