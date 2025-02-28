/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type NextAuthGetSessionAndUser = [NextAuthGetSessionAndUserquery1];
type NextAuthGetSessionAndUserquery1 = {
  expires: Date;
  id: RecordId;
  sessionToken: Uuid;
  userId: RecordId;
};
