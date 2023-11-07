export interface LatestRatesData {
  base: string;
  disclaimer: string;
  license: string;
  rates: Record<string, number>;
  timestamp: number;
}
