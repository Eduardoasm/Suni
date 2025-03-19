import { CountryTC } from './country.model';

export const CountryTypeName = CountryTC.getTypeName();
export const CountryType = CountryTC.getType();
export const CountryTypePlural = CountryTC.getTypePlural().getTypeName();
export const CountryTypeNonNull = CountryTC.getTypeNonNull();
