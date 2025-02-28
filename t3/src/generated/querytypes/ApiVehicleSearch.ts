/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
          
          import type { Uuid, RecordId } from "surrealdb";
export type ApiVehicleSearch = [
 ApiVehicleSearchquery1[]
]
type ApiVehicleSearchquery1 = {
  can_expire: boolean;
  exp_date: Date;
  make: string;
  market_page: boolean;
  model: string;
  published: boolean;
  varient: string;
}