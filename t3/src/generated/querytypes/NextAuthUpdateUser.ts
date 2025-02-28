import { type RecordId } from "surrealdb";

export type NextAuthUpdateUser = [
  [
    {
      email: string;
      emailVerified: Date | null;
      id: RecordId;
      image: string | undefined | null;
      name: string;
    }
  ]
];
