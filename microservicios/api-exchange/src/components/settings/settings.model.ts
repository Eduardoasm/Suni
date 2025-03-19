import { composeMongoose } from 'graphql-compose-mongoose';
import { Schema, Model, Document, model, Types } from 'mongoose';

export type feeTypeEnum = 'fixed' | 'percentage';

export interface IFee {
  type: feeTypeEnum;
  value: number;
}

export interface ISettings {
  _id?: any;
  makerFee: number;
  takerFee: number;
  transactionFee: number;
  transactions: {
    maxAmountAllowed?: number; // Max amount a user can set by transaction
    minAmountAllowed?: number; // Min amount a user can set by transaction
  };
  btc: {
    minTransAmount: number;
    transBreakPoint: number;
    cryptoHolderTransFeeUnderBreakPoint: IFee;
    cryptoHolderServiceFeeUnderBreakPoint: IFee;
    fiatHolderServiceFeeUnderBreakPoint: IFee;
    cryptoHolderTransFeeOverBreakPoint: IFee;
    cryptoHolderServiceFeeOverBreakPoint: IFee;
    fiatHolderServiceFeeOverBreakPoint: IFee;
  };
  active?: boolean;
}

export type SettingDocument = Document<Types.ObjectId, any, ISettings> &
  ISettings;

export const settingsSchema = new Schema<ISettings>({
  makerFee: {
    type: Number,
    required: [true, 'Please enter a maker fee'],
  },
  takerFee: {
    type: Number,
    required: [true, 'Please enter a taker fee'],
  },
  transactionFee: {
    type: Number,
    default: 0,
  },
  transactions: {
    maxAmountAllowed: {
      type: Number,
      default: 0,
    },
    minAmountAllowed: {
      type: Number,
      default: 0,
    },
  },
  btc: {
    minTransAmount: {
      type: Number,
      default: 0.004,
    },
    transBreakPoint: {
      type: Number,
      default: 0.0333,
    },
    cryptoHolderTransFeeUnderBreakPoint: {
      type: {
        type: String,
        enum: ['fixed', 'percentage'],
        default: 'fixed',
      },
      value: {
        type: Number,
        default: 0.0001,
      },
    },
    cryptoHolderServiceFeeUnderBreakPoint: {
      type: {
        type: String,
        enum: ['fixed', 'percentage'],
        default: 'percentage',
      },
      value: {
        type: Number,
        default: 0.5,
      },
    },
    fiatHolderServiceFeeUnderBreakPoint: {
      type: {
        type: String,
        enum: ['fixed', 'percentage'],
        default: 'percentage',
      },
      value: {
        type: Number,
        default: 0.5,
      },
    },
    cryptoHolderTransFeeOverBreakPoint: {
      type: {
        type: String,
        enum: ['fixed', 'percentage'],
        default: 'percentage',
      },
      value: {
        type: Number,
        default: 0.3,
      },
    },
    cryptoHolderServiceFeeOverBreakPoint: {
      type: {
        type: String,
        enum: ['fixed', 'percentage'],
        default: 'percentage',
      },
      value: {
        type: Number,
        default: 0.5,
      },
    },
    fiatHolderServiceFeeOverBreakPoint: {
      type: {
        type: String,
        enum: ['fixed', 'percentage'],
        default: 'percentage',
      },
      value: {
        type: Number,
        default: 0.5,
      },
    },
  },
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
