import { Schema } from 'mongoose';
import { schemaComposer } from 'graphql-compose';
import { convertSchemaToGraphQL } from 'graphql-compose-mongoose';

export interface IOptions {
  _id?: string;
  value: string;
}

export const optionsSchema = new Schema<IOptions>(
  {
    value: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

convertSchemaToGraphQL(optionsSchema, 'Options', schemaComposer);
