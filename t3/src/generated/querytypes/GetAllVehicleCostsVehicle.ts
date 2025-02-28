/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetAllVehicleCostsVehicle = [
  GetAllVehicleCostsVehiclequery1[]
]
type GetAllVehicleCostsVehiclequery1 = {
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
  vehicle_id: Vehicleid;
}
type Vehicleid = {
  SoldAmount: number;
  advertisingAmount: number;
  color: string;
  created_by: RecordId;
  engineNumber: string;
  id: RecordId;
  keyno: number;
  licNumber: string;
  make: string;
  mmCode: number;
  model: string;
  odoReading: number;
  purchaseAmount: number;
  purchaseDate: Date;
  purchasedBy: string;
  purchasedFrom: RecordId;
  sold: boolean;
  soldBy: string;
  soldDate: Date;
  soldTo: RecordId;
  stock_code: number;
  team: RecordId;
  varient: string;
  vinNumber: string;
  year: number;
}