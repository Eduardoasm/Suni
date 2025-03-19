import { IListing } from '../components/listing/listing';

export function maxAmountConvert(
  asset: string,
  listing: IListing,
  listingPrice: number
) {
  if (asset.toLowerCase() === 'lnd') {
    listing.maxAmountAsset = listing.amount - 1;
    listing.maxAmount = listing.maxAmountAsset * listingPrice;
  }
  return listing;
}
