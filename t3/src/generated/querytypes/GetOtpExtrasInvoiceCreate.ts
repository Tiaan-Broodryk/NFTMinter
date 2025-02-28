/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetOtpExtrasInvoiceCreate = [
  GetOtpExtrasInvoiceCreatequery1[]
]
type GetOtpExtrasInvoiceCreatequery1 = {
  extra_amount: number;
  extra_description: string;
  id: RecordId;
  otp_id: RecordId;
  team: Team;
  vehicle_id: RecordId;
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