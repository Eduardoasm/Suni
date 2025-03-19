import { MessageTC } from './message.model';

export const MessageTypeName = MessageTC.getTypeName();
export const MessageType = MessageTC.getType();
export const MessageTypePlural = MessageTC.getTypePlural().getTypeName();
export const MessageTypeNotNull = MessageTC.getTypeNonNull();
