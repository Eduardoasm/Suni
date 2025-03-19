import { Schema } from 'mongoose';
import { schemaComposer } from 'graphql-compose';
import { convertSchemaToGraphQL } from 'graphql-compose-mongoose';

export type OfferExpirationRateEnum = 'minutes' | 'hours';

export interface IOfferExpiration {
  _id?: any;
  rate: number;
  type: OfferExpirationRateEnum;
}

export const offerExpirationSchema = new Schema<IOfferExpiration>({
  rate: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['minutes', 'hours'],
    default: 'minutes',
  },
});

convertSchemaToGraphQL(
  offerExpirationSchema,
  'OfferExpiration',
  schemaComposer
);
