/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetMarketPagePromoCodes = [
  GetMarketPagePromoCodesquery1[]
]
type GetMarketPagePromoCodesquery1 = {
  ExpiryDate: Date;
  Free: boolean;
  Price: number;
  PromoCode: string;
  id: RecordId;
  valid: boolean;
}