import { Schema } from 'mongoose';
import { schemaComposer } from 'graphql-compose';
import { convertSchemaToGraphQL } from 'graphql-compose-mongoose';

export interface IWallet {
  _id?: string;
  name: string;
  address: string;
  active: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export const walletSchema = new Schema<IWallet>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please enter a name of wallet'],
    },
    address: {
      type: String,
      required: [true, 'Please enter a address of wallet'],
    },
  },
  {
    timestamps: true,
  }
);

convertSchemaToGraphQL(walletSchema, 'Wallet', schemaComposer);
