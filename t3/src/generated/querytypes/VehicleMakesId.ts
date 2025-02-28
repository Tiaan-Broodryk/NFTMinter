/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type VehicleMakesId = [
  VehicleMakesIdquery1[]
]
type VehicleMakesIdquery1 = {
  id: RecordId;
  make: string;
}