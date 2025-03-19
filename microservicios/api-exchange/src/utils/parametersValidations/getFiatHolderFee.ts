import { TGetFee } from '../../components/transaction/transaction.dto';
import { ISettings } from '../../components/settings/settings.model';

export async function getFiatHolderFee(body: TGetFee, settings: ISettings) {
  if (body.assetNetwork.toLowerCase() === 'btc') {
    if (body.transactionAmount <= settings.btc.transBreakPoint) {
      return Number(
        (settings.btc.fiatHolderServiceFeeUnderBreakPoint.type === 'fixed'
          ? settings.btc.fiatHolderServiceFeeUnderBreakPoint.value
          : (settings.btc.fiatHolderServiceFeeUnderBreakPoint.value *
              body.transactionAmount) /
            100
        ).toFixed(8)
      );
    }
    return Number(
      (settings.btc.fiatHolderServiceFeeOverBreakPoint.type === 'fixed'
        ? settings.btc.fiatHolderServiceFeeOverBreakPoint.value
        : (settings.btc.fiatHolderServiceFeeOverBreakPoint.value *
            body.transactionAmount) /
          100
      ).toFixed(8)
    );
  }
  if (body.assetNetwork.toLocaleLowerCase() === 'lnd') {
    return Math.trunc(
      ((body.userRole === 'maker' ? settings.makerFee : settings.takerFee) *
        body.transactionAmount) /
        100
    );
  }
  return (
    ((body.userRole === 'maker' ? settings.makerFee : settings.takerFee) *
      body.transactionAmount) /
    100
  );
}
