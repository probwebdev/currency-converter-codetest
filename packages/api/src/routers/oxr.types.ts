export interface RatesData {
  base: string;
  disclaimer: string;
  license: string;
  rates: Record<string, number>;
  timestamp: number;
}

export type CurrenciesData = Record<string, string>;
