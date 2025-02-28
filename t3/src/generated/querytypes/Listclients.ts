import type { Uuid, RecordId } from "surrealdb";
export type Listclients = [
  Listclientsquery1[]
]
type Listclientsquery1 = {
  client_address: string;
  client_city: string;
  client_company_cell: string;
  client_company_name: string;
  client_company_reg: string;
  client_company_trading_name: string;
  client_company_vat: string;
  client_is_company: boolean;
  client_postal_code: string;
  contact_email: string;
  contact_name: string;
  contact_phone: string;
  contact_surname: string;
  created_by: string;
  id: RecordId;
  team: RecordId;
  client_id_no?: string;
}