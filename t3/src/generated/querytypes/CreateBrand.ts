import type { Uuid, RecordId } from "surrealdb";
export type CreateBrand = [
  CreateBrandquery1[]
]
type CreateBrandquery1 = {
  brand_name: string;
  description: string;
  id: RecordId;
  website: string;
}