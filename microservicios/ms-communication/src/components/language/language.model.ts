import { Schema, Document, Types, Model, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';

export interface ILanguage {
  _id?: any;
  code: string;
  name: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type LanguageDocument = Document<Types.ObjectId, any, ILanguage> &
  ILanguage;

const languageSchema = new Schema<ILanguage>(
  {
    code: {
      type: String,
    },
    name: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Language = model<ILanguage, Model<ILanguage>>(
  'Language',
  languageSchema
);

export const LanguageTC = composeMongoose<LanguageDocument>(Language as any);
