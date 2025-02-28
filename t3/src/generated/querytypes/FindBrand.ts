import type { Uuid, RecordId } from "surrealdb";
export type FindBrand = [
  FindBrandquery1[]
]
type FindBrandquery1 = {
  brand_name: string;
  description: string;
  id: RecordId;
  website: string;
}