import type { Uuid, RecordId } from "surrealdb";
export type ProductsByBrandModelSlug = [
  ProductsByBrandModelSlugquery1[]
]
type ProductsByBrandModelSlugquery1 = {
  brand_name: string;
  code: string;
  colour: string;
  created_at: Date;
  description: string;
  id: RecordId;
  long_code: string;
  model_name: string;
  product_name: string;
  type: string;
  updated_at: Date;
}