/* eslint-disable @typescript-eslint/ban-types */
import type { Uuid, RecordId } from "surrealdb";
export type InfoForDb = [InfoForDbquery1];
type InfoForDbquery1 = {
  analyzers: Analyzers;
  functions: Analyzers;
  models: Analyzers;
  params: Analyzers;
  scopes: Analyzers;
  tables: Tables;
  tokens: Analyzers;
  users: Users;
};
type Users = {
  sfp: string;
};
type Tables = {
  account: string;
  session: string;
  user: string;
};
type Analyzers = {};
