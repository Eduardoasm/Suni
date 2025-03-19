import { Types } from 'mongoose';
import { SettingsTC } from './settings.model';

export const SettingsType = SettingsTC.getType();
export const SettingsTypeName = SettingsTC.getTypeName();
export const SettingsTypePlural = SettingsTC.getTypePlural().getTypeName();
export const SettingsTypeNotNull = SettingsTC.getTypeNonNull();
