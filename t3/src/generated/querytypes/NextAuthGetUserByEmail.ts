import { type RecordId } from "surrealdb";

export type NextAuthGetUserByEmail = [
  {
    email: string;
    emailVerified: Date | null;
    id: RecordId;
    image: string | undefined | null;
    name: string;
  }
];
