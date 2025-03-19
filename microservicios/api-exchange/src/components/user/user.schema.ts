import { Schema } from 'mongoose';
import { schemaComposer } from 'graphql-compose';
import { convertSchemaToGraphQL } from 'graphql-compose-mongoose';

export interface IUser {
  _id?: string;
  id: string;
  email: string;
  name: string;
  lastname: string;
}

export const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
    },
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

convertSchemaToGraphQL(userSchema, 'User', schemaComposer);
