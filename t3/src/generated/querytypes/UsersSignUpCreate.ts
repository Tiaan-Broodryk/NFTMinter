/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type UsersSignUpCreate = [
  UsersSignUpCreatequery1[]
]
type UsersSignUpCreatequery1 = {
  email: string;
  emailVerified: Date;
  id: RecordId;
  name: string;
}