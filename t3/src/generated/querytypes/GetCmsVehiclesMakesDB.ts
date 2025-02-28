/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
          
          import type { Uuid, RecordId } from "surrealdb";
export type GetCmsVehiclesMakesDB = [
 GetCmsVehiclesMakesDBquery1[]
]
type GetCmsVehiclesMakesDBquery1 = {
  id: RecordId;
  make: string;
  mmcode: string;
  model: string;
  variant: string;
}