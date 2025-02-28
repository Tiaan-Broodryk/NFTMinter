/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetVehicleCost = [
  GetVehicleCostquery1[]
]
type GetVehicleCostquery1 = {
  amount: number;
  cost_code: number;
  created_by: RecordId;
  date: Date;
  description: string;
  id: RecordId;
  name: string;
  supplier: Supplier;
  team: Team;
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
type Team = {
  city: string;
  company_name: string;
  company_reg: string;
  company_trading_name: string;
  description: string;
  id: RecordId;
  image: string;
  name: string;
  office_cell: string;
  owner: RecordId;
  postal_code: string;
  slug: string;
  street_address: string;
  vat_no: string;
}
type Supplier = {
  contact_email: string;
  contact_name: string;
  contact_phone: string;
  contact_surname: string;
  created_by: string;
  id: RecordId;
  supplier_address: string;
  supplier_city: string;
  supplier_company_cell: string;
  supplier_company_name: string;
  supplier_company_reg: string;
  supplier_company_trading_name: string;
  supplier_company_vat: string;
  supplier_is_company: boolean;
  supplier_postal_code: string;
  team: RecordId;
}