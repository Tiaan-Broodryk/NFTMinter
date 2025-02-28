/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetVehicleContactClicks = [
  GetVehicleContactClicksquery1[]
]
type GetVehicleContactClicksquery1 = {
  click_date: Date;
  id: RecordId;
  vehicle: RecordId;
}