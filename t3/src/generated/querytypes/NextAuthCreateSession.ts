/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type NextAuthCreateSession = [
  NextAuthCreateSessionquery1
]
type NextAuthCreateSessionquery1 = {
  expires: Date;
  id: RecordId;
  sessionToken: Uuid;
  userId: RecordId;
}