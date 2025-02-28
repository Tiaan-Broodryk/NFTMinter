/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetVehicleImages = [
  GetVehicleImagesquery1[]
]
type GetVehicleImagesquery1 = {
  id: RecordId;
  order: number;
  src: string;
  vehicle_id: RecordId;
}