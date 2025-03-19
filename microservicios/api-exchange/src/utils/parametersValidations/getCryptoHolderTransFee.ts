import { TGetFee } from '../../components/transaction/transaction.dto';
import { ISettings } from '../../components/settings/settings.model';

export async function getCryptoHolderTransFee(
  body: TGetFee,
  settings: ISettings
) {
  if (body.assetNetwork.toLowerCase() === 'btc') {
    if (body.transactionAmount <= settings.btc.transBreakPoint) {
      return Number(
        (settings.btc.cryptoHolderTransFeeUnderBreakPoint.type === 'fixed'
          ? settings.btc.cryptoHolderTransFeeUnderBreakPoint.value
          : (settings.btc.cryptoHolderTransFeeUnderBreakPoint.value *
              body.transactionAmount) /
            100
        ).toFixed(8)
      );
    }
    return Number(
      (settings.btc.cryptoHolderTransFeeOverBreakPoint.type === 'fixed'
        ? settings.btc.cryptoHolderTransFeeOverBreakPoint.value
        : (settings.btc.cryptoHolderTransFeeOverBreakPoint.value *
            body.transactionAmount) /
          100
      ).toFixed(8)
    );
  }
  if (body.assetNetwork.toLocaleLowerCase() === 'lnd') {
    return Math.trunc((settings.transactionFee * body.transactionAmount) / 100);
  }
  return (settings.transactionFee * body.transactionAmount) / 100;
}
