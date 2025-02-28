/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
          
          import type { Uuid, RecordId } from "surrealdb";
export type GetExchangeRate = [
 GetExchangeRatequery1[]
]
type GetExchangeRatequery1 = {
  code: string;
  currency_code: string;
  currency_name: string;
  currency_rate: number;
  currency_symbol: string;
  emoji: string;
  id: RecordId;
  name: string;
  price_pro: string;
  price_std: string;
  unicode: string;
}