/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetSalesExecutives = [
  GetSalesExecutivesquery1[]
]
type GetSalesExecutivesquery1 = {
  email: string;
  id: RecordId;
  image: string;
  leadAlowed: boolean;
  name: string;
  phone: string;
  surname: string;
  team: RecordId;
}