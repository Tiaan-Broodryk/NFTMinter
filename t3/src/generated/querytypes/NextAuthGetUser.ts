/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type NextAuthGetUser = [
  NextAuthGetUserquery1
]
type NextAuthGetUserquery1 = {
  email: string;
  emailVerified: Date;
  id: RecordId;
  image: string;
  name: string;
}