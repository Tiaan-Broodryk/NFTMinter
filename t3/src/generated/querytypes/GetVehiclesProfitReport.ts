/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetVehiclesProfitReport = [
  GetVehiclesProfitReportquery1[]
]
type GetVehiclesProfitReportquery1 = {
  SoldAmount: number;
  advertisingAmount?: number;
  color: string;
  created_by: RecordId;
  engineNumber: string;
  id: RecordId;
  invoice_extras: any[];
  keyno?: number;
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
  soldTo: RecordId | string;
  stock_code: number;
  team: RecordId;
  varient: string;
  vehicle_costs: any[];
  vehicle_invoice: any[];
  vinNumber: string;
  year: number;
}