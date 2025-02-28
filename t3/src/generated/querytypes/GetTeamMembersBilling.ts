/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetTeamMembersBilling = [
  GetTeamMembersBillingquery1[]
]
type GetTeamMembersBillingquery1 = {
  created_at?: Date;
  email?: string;
  id: RecordId;
  invited_by?: RecordId;
  pending: boolean;
  role: string;
  team: RecordId;
  user: User;
}
type User = {
  email: string;
  emailVerified: Date;
  id: RecordId;
  image: string;
  name: string;
}