import { composeMongoose } from 'graphql-compose-mongoose';
import { Schema, Model, Document, model, Types } from 'mongoose';
import {
  creditScoreParamsSchema,
  ICreditScoreParams,
} from '../credit-score-params';
import {
  creditScoreRangeSchema,
  ICreditScoreRange,
} from '../credit-score-range';
import {
  IOfferExpiration,
  offerExpirationSchema,
} from '../offer-expiration/offer-expiration.schema';
import {
  IContractFeeSettings,
  contractFeeSettingsSchema,
} from '../contract-fee-settings';
import {
  IContractSettings,
  contractSettingsSchema,
} from '../contract-settings';

export interface ISettings {
  _id?: any;
  offerExpiration?: IOfferExpiration;
  creditScoreParams?: Array<ICreditScoreParams>;
  creditScoreRange?: Array<ICreditScoreRange>;
  maxInterestRate?: number;
  minInterestRate?: number;
  contract?: IContractSettings;
  contractFees?: IContractFeeSettings;
  active?: boolean;
}

export type SettingDocument = Document<Types.ObjectId, any, ISettings> &
  ISettings;

export const settingsSchema = new Schema<ISettings>({
  offerExpiration: {
    type: offerExpirationSchema,
  },
  creditScoreParams: [creditScoreParamsSchema],
  creditScoreRange: [creditScoreRangeSchema],
  maxInterestRate: {
    type: Number,
    default: 0,
  },
  minInterestRate: {
    type: Number,
    default: 0,
  },
  contract: contractSettingsSchema,
  contractFees: contractFeeSettingsSchema,
  active: {
    type: Boolean,
    default: true,
  },
});

export const Settings = model<ISettings, Model<ISettings>>(
  'Settings',
  settingsSchema
);

export const SettingsTC = composeMongoose<SettingDocument>(Settings as any);
