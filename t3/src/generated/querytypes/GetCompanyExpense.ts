/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetCompanyExpense = [
  GetCompanyExpensequery1[]
]
type GetCompanyExpensequery1 = {
  created_by: RecordId;
  expenseAmount: number;
  expenseDate: Date;
  expenseReference: string;
  expenseType: string;
  id: RecordId;
  team: RecordId;
}