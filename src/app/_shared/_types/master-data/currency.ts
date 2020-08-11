import { Doc } from "../doc";

export interface Currency {
  currencyName: string;
  code: string;
  symbol: string;
  symbolHTML: string;
  isEnabled: boolean;
}

export interface CurrencyDoc extends Currency, Doc { }
