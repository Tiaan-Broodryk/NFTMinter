/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type CheckTeamMembership = [
  CheckTeamMembershipquery1
]
type CheckTeamMembershipquery1 = {
  created_at: Date;
  email: string;
  id: RecordId;
  invited_by: RecordId;
  pending: boolean;
  role: string;
  team: RecordId;
  user: RecordId;
}