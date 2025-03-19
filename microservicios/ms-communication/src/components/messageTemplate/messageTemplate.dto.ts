import { Types } from 'mongoose';
import { MessageTemplateTC } from './messageTemplate.model';

export const MessageTemplateTypeName = MessageTemplateTC.getTypeName();
export const MessageTemplateType = MessageTemplateTC.getType();
export const MessageTemplateTypePlural =
  MessageTemplateTC.getTypePlural().getTypeName();
export const MessageTemplateTypeNotNull = MessageTemplateTC.getTypeNonNull();

export type TCreateMessageTemplate = {
  language: Types.ObjectId;
  title: string;
  content: string;
};
