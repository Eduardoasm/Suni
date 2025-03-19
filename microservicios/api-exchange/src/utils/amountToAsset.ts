import { IListing } from '../components/listing/listing/listing.model';
// se añadio la propiedad price ya que con el nuevo feature de pricePercentage
// en algunas ocasiones no vendra el price en el body y se calculara
export function amountToAsset(
  body: any,
  price: number,
  asset: string,
  listing?: IListing
) {
  const listingPrice = body?.price ? price : listing.price;
  if (asset.toLowerCase() === 'lnd') {
    body.amount = Math.trunc(body.amount / listingPrice) + 1;
  }

  if (asset.toLowerCase() === 'btc') {
    body.amount = Number((body.amount / listingPrice).toFixed(8));
  }

  return body.amount;
}
