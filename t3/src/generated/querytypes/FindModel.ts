import type { Uuid, RecordId } from "surrealdb";
export type FindModel = [
  FindModelquery1[]
]
type FindModelquery1 = {
  brand_id: RecordId;
  brand_name: string;
  description: string;
  id: RecordId;
  model_name: string;
}