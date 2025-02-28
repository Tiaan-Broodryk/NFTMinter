/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetVehicleCostType = [
  GetVehicleCostTypequery1[]
]
type GetVehicleCostTypequery1 = {
  created_by: RecordId;
  id: RecordId;
  name: string;
  team: string;
  team_id: RecordId;
}