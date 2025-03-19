import { Schema, Document, Types, Model, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { ILanguage, LanguageTC } from '../language/language.model';

export interface IMessage {
  _id?: any;
  language: Types.ObjectId | ILanguage;
  title: string;
  content: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type MessageDocument = Document<Types.ObjectId, any, IMessage> &
  IMessage;

export const messageSchema = new Schema<IMessage>(
  {
    language: {
      type: Schema.Types.ObjectId,
      ref: 'Language',
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Message = model<IMessage, Model<IMessage>>(
  'Message',
  messageSchema
);

export const MessageTC = composeMongoose<MessageDocument>(Message as any);

MessageTC.addRelation('language', {
  resolver: () => LanguageTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.language,
  },
  projection: { language: 1 },
});
