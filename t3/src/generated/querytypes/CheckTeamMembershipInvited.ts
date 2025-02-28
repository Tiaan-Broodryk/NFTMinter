/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type CheckTeamMembershipInvited = [
  CheckTeamMembershipInvitedquery1
]
type CheckTeamMembershipInvitedquery1 = {
  created_at: Date;
  email: string;
  id: RecordId;
  invited_by_user?: any;
  pending: boolean;
  role: string;
  team: Team;
}
type Team = {
  id: RecordId;
  image: string;
  name: string;
}