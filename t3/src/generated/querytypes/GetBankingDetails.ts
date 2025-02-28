/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetBankingDetails = [
  GetBankingDetailsquery1[]
]
type GetBankingDetailsquery1 = {
  account_number: number;
  bank: string;
  branch: string;
  branch_code: string;
  id: RecordId;
  team: RecordId;
  type: string;
}