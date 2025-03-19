import { Schema } from 'mongoose';
import { schemaComposer } from 'graphql-compose';
import { convertSchemaToGraphQL } from 'graphql-compose-mongoose';

export interface IMultimedia {
  _id?: string;
  src: string;
  alt: string | null;
  type: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const multimediaSchema = new Schema<IMultimedia>(
  {
    src: {
      type: String,
      trim: true,
    },
    alt: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

convertSchemaToGraphQL(multimediaSchema, 'Multimedia', schemaComposer);
