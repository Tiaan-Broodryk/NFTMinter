/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetFinanceHouses = [
  GetFinanceHousesquery1[]
]
type GetFinanceHousesquery1 = {
  city: string;
  finance_house: string;
  finance_house_vat_no: string;
  id: RecordId;
  office_cell: string;
  postal_code: string;
  street_address: string;
  team: RecordId;
}