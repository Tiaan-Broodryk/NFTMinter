/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type NextAuthCreateVerificationRequest = [
  NextAuthCreateVerificationRequestquery1
]
type NextAuthCreateVerificationRequestquery1 = {
  expires: Date;
  id: RecordId;
  identifier: string;
  token: string;
}