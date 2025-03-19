import { ILoanOffer } from '../components/loanOffer';
import { ILoanRequest } from '../components/loanRequest';
import { deleteBlock } from './walletService/cancelAd';
import * as loanOfferService from '../components/loanOffer/loanOffer.service';
import { sendNotifications } from './pushNotifications/sendNotification';

export function rejectOffers(
  loanRequest: ILoanRequest,
  token: string,
  loanOffer?: ILoanOffer,
  session?: any
) {
  return loanRequest?.offers.reduce((promises, offer: ILoanOffer) => {
    if (
      offer?._id.toString() !== loanOffer?._id.toString() &&
      offer.status === 'active'
    ) {
      const paramsPush = {
        token,
        userId: offer.lender,
        title: 'Oferta no aprobada',
        message: `Tu oferta ${offer.referenceNumber} no ha sido aprobada`,
      };
      const deleteOfferBlock = deleteBlock(token, offer.blockId);
      const pushRejected = sendNotifications(paramsPush);
      const rejectOffer = loanOfferService.findOneAndUpdate(
        { _id: offer._id },
        {
          status: 'rejected',
        },
        { session }
      );
      promises.push(Promise.all([deleteOfferBlock, rejectOffer, pushRejected]));
    }
    return promises;
  }, []);
}
