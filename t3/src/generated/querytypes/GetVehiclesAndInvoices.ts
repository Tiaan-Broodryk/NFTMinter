/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetVehiclesAndInvoices = [GetVehiclesAndInvoicesquery1[]];
type GetVehiclesAndInvoicesquery1 = {
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
  purchasedFrom: Supplier;
  sold: boolean;
  soldBy: string;
  soldDate: Date;
  soldTo: RecordId | string;
  stock_code: number;
  team: RecordId;
  varient: string;
  vehicle_invoice: Invoice;
  vinNumber: string;
  year: number;
};

type Invoice = {
  bankingDetails: RecordId;
  created_by: RecordId;
  datePaid: Date;
  delivered: boolean;
  deliveryDate: Date;
  deposit: boolean;
  deposit_amount: number;
  financeHouse: RecordId;
  finance_deal: boolean;
  id: RecordId;
  invoiceDate: Date;
  invoiceTotal: number;
  invoice_code: number;
  paid: boolean;
  soldTo: RecordId;
  team: RecordId;
  trade_in: boolean;
  trade_in_vehicle: RecordId;
  vehicle: RecordId;
};
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
};
