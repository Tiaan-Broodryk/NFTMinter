/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetCmsVehiclesMakes = [
  GetCmsVehiclesMakesquery1[]
]
type GetCmsVehiclesMakesquery1 = {
  Brand: string;
  MMCode: string;
  Model: string;
  ModelRange: string;
  model2?: string;
  variant: string;
}