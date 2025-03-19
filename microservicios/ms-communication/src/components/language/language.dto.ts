import { LanguageTC } from './language.model';

export const LanguageTypeName = LanguageTC.getTypeName();
export const LanguageType = LanguageTC.getType();
export const LanguageTypePlural = LanguageTC.getTypePlural().getTypeName();
export const LanguageTypeNotNull = LanguageTC.getTypeNonNull();
