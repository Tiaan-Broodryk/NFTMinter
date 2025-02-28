import type { Uuid, RecordId } from "surrealdb";
export type CreateModel = [
  CreateModelquery1[]
]
type CreateModelquery1 = {
  brand_id: RecordId;
  brand_name: string;
  description: string;
  id: RecordId;
  model_name: string;
}