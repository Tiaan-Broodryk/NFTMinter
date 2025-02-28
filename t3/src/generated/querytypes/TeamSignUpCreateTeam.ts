/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
          
          import type { Uuid, RecordId } from "surrealdb";
export type TeamSignUpCreateTeam = [
 TeamSignUpCreateTeamquery1[]
]
type TeamSignUpCreateTeamquery1 = {
  description: string;
  freeTrial: boolean;
  id: RecordId;
  name: string;
  owner: RecordId;
  pro: boolean;
  slug: string;
}