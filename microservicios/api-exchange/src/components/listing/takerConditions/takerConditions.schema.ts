import { Schema } from 'mongoose';
import { schemaComposer } from 'graphql-compose';
import { convertSchemaToGraphQL } from 'graphql-compose-mongoose';

export interface ITakerConditions {
  _id?: string;
  conditionName: string;
  conditionValue: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const takerConditionsSchema = new Schema<ITakerConditions>(
  {
    conditionName: {
      type: String,
    },
    conditionValue: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

convertSchemaToGraphQL(
  takerConditionsSchema,
  'TakerConditions',
  schemaComposer
);
