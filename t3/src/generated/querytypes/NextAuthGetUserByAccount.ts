/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type NextAuthGetUserByAccount = [
  NextAuthGetUserByAccountquery1
]
type NextAuthGetUserByAccountquery1 = {
  access_token: string;
  expires_at: number;
  id: RecordId;
  provider: string;
  providerAccountId: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  type: string;
  userId: RecordId;
}