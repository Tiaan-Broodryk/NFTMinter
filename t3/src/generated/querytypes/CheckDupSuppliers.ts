/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type CheckDupSuppliers = [
  CheckDupSuppliersquery1[]
]
type CheckDupSuppliersquery1 = {
  contact_email: string;
  contact_name: string;
  contact_phone: string;
  contact_surname: string;
  id: RecordId;
  supplier_address: string;
  supplier_city: string;
  supplier_company_cell: string;
  supplier_company_name: string;
  supplier_company_reg: string;
  supplier_company_trading_name: string;
  supplier_company_vat: string;
  supplier_id_no: string;
  supplier_is_company: boolean;
  supplier_postal_code: string;
  team: RecordId;
}