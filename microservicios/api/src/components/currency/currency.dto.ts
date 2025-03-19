import { CurrencyTC } from './currency.model';

export const CurrencyTypeName = CurrencyTC.getTypeName();
export const CurrencyType = CurrencyTC.getType();
export const CurrencyTypePlural = CurrencyTC.getTypePlural().getTypeName();
export const CurrencyTypeNotNull = CurrencyTC.getTypeNonNull();

export type TCreateCurrencyInput = {
  name: string;
  symbol: string;
};

export const CreateCurrencyInput = `
  input CreateCurrencyInput {
    name: String!
    symbol: String!
  }
`;
