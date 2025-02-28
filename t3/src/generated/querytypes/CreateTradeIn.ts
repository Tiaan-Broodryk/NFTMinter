/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type CreateTradeIn = [
  CreateTradeInquery1[]
]
type CreateTradeInquery1 = {
  color: string;
  created_by: RecordId;
  engineNumber: string;
  id: RecordId;
  licNumber: string;
  make: string;
  mmCode: number;
  model: string;
  odoReading: number;
  purchaseAmount: number;
  purchaseDate: Date;
  purchasedBy: string;
  purchasedFrom: RecordId;
  sold: boolean;
  stock_code: number;
  team: RecordId;
  varient: string;
  vinNumber: string;
  year: number;
}