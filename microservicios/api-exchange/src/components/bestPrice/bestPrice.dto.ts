import { Types } from 'mongoose';
import { BestPriceTC } from './bestPrice.model';

export const BestPriceTypeName = BestPriceTC.getTypeName();
export const BestPriceType = BestPriceTC.getType();
export const BestPriceTypePlural = BestPriceTC.getTypePlural().getTypeName();
export const BestPriceTypeNonNull = BestPriceTC.getTypeNonNull();

export type TGetBestPrice = {
  currencyId: Types.ObjectId;
  assetId: Types.ObjectId;
};

export const GetBestPriceInput = `
  input GetBestPrice {
    currencyId: MongoID!
    assetId: MongoID!
  }
`;
