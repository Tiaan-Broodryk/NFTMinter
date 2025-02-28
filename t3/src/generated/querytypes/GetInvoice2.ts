/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetInvoice2 = [
  GetInvoice2query1[]
]
type GetInvoice2query1 = {
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
}