/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
          
          import type { Uuid, RecordId } from "surrealdb";
export type GetMiscInvoice = [
 GetMiscInvoicequery1[]
]
type GetMiscInvoicequery1 = {
  clientReference: string;
  due: Date;
  id: RecordId;
  invoiceToId: InvoiceToId;
  invoice_items: Invoiceitems[];
  issued: Date;
  reference: boolean;
  status: string;
}
type Invoiceitems = {
  amount: number;
  description: string;
  id: RecordId;
  invoice_id: RecordId;
  quantity: number;
  vatable: boolean;
}
type InvoiceToId = {
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
  contact_email: string;
  contact_name: string;
  contact_phone: string;
  contact_surname: string;
  id: RecordId;
}