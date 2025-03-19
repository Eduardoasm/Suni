import { Types, model, Document, Model, Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';

export interface IAsset {
  _id?: any;
  name: string;
  symbol: string;
  network: string;
  decimals: number;
  index: number;
  conversionRateToUsd?: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type AssetDocument = Document<Types.ObjectId, any, IAsset> & IAsset;

const assetSchema = new Schema<IAsset>(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    symbol: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    network: {
      type: String,
      trim: true,
      unique: true,
    },
    decimals: {
      type: Number,
    },
    index: {
      type: Number,
    },
    conversionRateToUsd: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Asset = model<IAsset, Model<IAsset>>('Asset', assetSchema);

export const AssetTC = composeMongoose<AssetDocument>(Asset as any);
