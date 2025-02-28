/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
          
          import type { Uuid, RecordId } from "surrealdb";
export type GetAllMiscInvoices = [
 GetAllMiscInvoicesquery1[]
]
type GetAllMiscInvoicesquery1 = {
  clientReference: string;
  due: string;
  id: RecordId;
  invoiceToId: InvoiceToId;
  invoice_code: number;
  invoice_items: Invoiceitems[];
  issued: string;
  reference: boolean;
  status: string;
  team: RecordId;
}
type Invoiceitems = {
  amount: number;
  description: string;
  id: RecordId;
  invoice_id: RecordId;
  quantity: number;
  team: RecordId;
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
  created_by: string;
  id: RecordId;
  team: RecordId;
}