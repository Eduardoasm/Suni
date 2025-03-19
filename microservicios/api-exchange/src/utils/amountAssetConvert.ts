import { IAsset } from '../components/asset';

export function amountAssetConvert(body: any, asset: IAsset) {
  if (asset.network.toLowerCase() === 'lnd') {
    body.amount = Math.trunc(body.amount) + 1;
  }

  if (asset.network.toLowerCase() === 'btc') {
    body.amount = Number(body.amount.toFixed(8));
  }

  return body.amount;
}
