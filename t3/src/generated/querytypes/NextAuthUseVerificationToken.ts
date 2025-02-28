/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type NextAuthUseVerificationToken = [
  NextAuthUseVerificationTokenquery1[]
]
type NextAuthUseVerificationTokenquery1 = {
  expires: Date;
  id: RecordId;
  identifier: string;
  token: string;
}