/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetAllInvoicesReport = [GetAllInvoicesReportquery1[]];
type GetAllInvoicesReportquery1 = {
  bankingDetails: RecordId;
  created_by: RecordId;
  datePaid: Date | string;
  delivered: boolean;
  deliveryDate: Date | string;
  deposit: boolean;
  deposit_amount: number;
  financeHouse?: FinanceHouse;
  finance_deal: boolean;
  id: RecordId;
  invoiceDate: Date;
  invoiceTotal: number;
  invoice_code: number;
  paid: boolean;
  soldTo: SoldTo;
  team: RecordId;
  trade_in: boolean;
  trade_in_vehicle?: Vehicle;
  vehicle: Vehicle;
};
type Vehicle = {
  SoldAmount: number;
  advertisingAmount?: number;
  color: string;
  created_by: RecordId;
  engineNumber: string;
  id: RecordId;
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
  soldTo: RecordId;
  stock_code: number;
  team: RecordId;
  varient: string;
  vinNumber: string;
  year: number;
};
type SoldTo = {
  client_address: string;
  client_city: string;
  client_company_cell: string;
  client_company_name: string;
  client_company_reg: string;
  client_company_trading_name: string;
  client_company_vat: string;
  client_id_no?: string;
  client_is_company: boolean;
  client_postal_code: string;
  contact_email: string;
  contact_name: string;
  contact_phone: string;
  contact_surname: string;
  created_by: string;
  id: RecordId;
  team: RecordId;
};
type FinanceHouse = {
  city: string;
  finance_house: string;
  finance_house_vat_no: string;
  id: RecordId;
  office_cell: string;
  postal_code: string;
  street_address: string;
  team: RecordId;
};
