/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetInvoiceExtras = [GetInvoiceExtrasquery1[]];
type GetInvoiceExtrasquery1 = {
  extra_amount: number;
  extra_description: string;
  id: RecordId;
  invoice_id: RecordId;
  team: RecordId;
  vehicle_id: RecordId;
};
