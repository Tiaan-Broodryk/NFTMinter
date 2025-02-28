/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type Getotp = [
  Getotpquery1[]
]
type Getotpquery1 = {
  client_address: string;
  client_city: string;
  client_company_cell: string;
  client_company_name: string;
  client_company_reg: string;
  client_company_trading_name: string;
  client_company_vat: string;
  client_id_no: string;
  client_is_company: boolean;
  client_postal_code: string;
  color: string;
  contact_email: string;
  contact_name: string;
  contact_phone: string;
  contact_surname: string;
  created_by: RecordId;
  date: Date;
  deposit: boolean;
  deposit_amount: number;
  engineNumber: string;
  finance_deal: boolean;
  finance_house: string;
  id: RecordId;
  licNumber: string;
  make: string;
  mmCode: number;
  model: string;
  odoReading: number;
  otp_code: number;
  selling_amount: number;
  team: Team;
  trade_in: boolean;
  trade_in_amount: number;
  varient: string;
  vehicle: Vehicle;
  vehicle_id: string;
  vinNumber: string;
  year: number;
}
type Vehicle = {
  SoldAmount: number;
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
  currency: string;
  currency_symbol: string;
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
  vat_percentage: number;
}