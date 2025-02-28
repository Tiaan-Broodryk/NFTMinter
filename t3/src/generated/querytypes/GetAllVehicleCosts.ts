/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetAllVehicleCosts = [
  GetAllVehicleCostsquery1[]
]
type GetAllVehicleCostsquery1 = {
  amount: number;
  cost_code: number;
  created_by: RecordId;
  date: Date;
  description: string;
  id: RecordId;
  name: string;
  supplier: RecordId;
  team: RecordId;
  type: string;
  vehicle_id: RecordId;
  date_paid?: Date;
  paid?: boolean;
  processed?: boolean;
}