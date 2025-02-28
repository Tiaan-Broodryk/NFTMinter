/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
          
          import type { Uuid, RecordId } from "surrealdb";
export type GetTeamMember = [
 GetTeamMemberquery1
]
type GetTeamMemberquery1 = {
  created_at: Date;
  email: string;
  id: RecordId;
  pending: boolean;
  role: string;
  team: RecordId;
  user: RecordId;
}