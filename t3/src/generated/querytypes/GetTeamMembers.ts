/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetTeamMembers = [
  GetTeamMembersquery1[],
  GetTeamMembersquery2[]
]
type GetTeamMembersquery2 = {
  id: RecordId;
  pending: boolean;
  role: string;
  team: RecordId;
  user: User;
  created_at?: Date;
  email?: string;
  invited_by?: RecordId;
}
type User = {
  email: string;
  emailVerified: Date | null;
  id: RecordId;
  image: string;
  name: string;
}
type GetTeamMembersquery1 = {
  created_at: Date;
  email: string;
  id: RecordId;
  invited_by: RecordId;
  pending: boolean;
  role: string;
  team: RecordId;
}