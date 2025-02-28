/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetUserTeams = [
  GetUserTeamsquery1[]
]
type GetUserTeamsquery1 = {
  id: RecordId;
  pending: boolean;
  role: string;
  team: Team;
  user: RecordId;
  created_at?: Date;
  email?: string;
  invited_by?: RecordId;
}
type Team = {
  city?: string;
  company_name?: string;
  company_reg?: string;
  company_trading_name?: string;
  description: string;
  id: RecordId;
  image?: string;
  name: string;
  office_cell?: string;
  owner: RecordId;
  postal_code?: string;
  slug: string;
  street_address?: string;
  vat_no?: string;
}