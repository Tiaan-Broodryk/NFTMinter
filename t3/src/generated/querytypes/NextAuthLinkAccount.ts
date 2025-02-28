import { type RecordId } from "surrealdb";

export type NextAuthLinkAccount = [
  {
    access_token: string;
    expires_at: number;
    id: RecordId;
    provider: string;
    providerAccountId: string;
    refresh_token: string | undefined;
    scope: string;
    token_type: string;
    type: string;
    userId: RecordId;
  }
];
