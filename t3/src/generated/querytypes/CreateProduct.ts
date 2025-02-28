import type { Uuid, RecordId } from "surrealdb";
export type CreateProduct = [
  CreateProductquery1[]
]
type CreateProductquery1 = {
  brand_name: string;
  code: string;
  colour: string;
  created_at: Date;
  description: string;
  id: RecordId;
  model_name: string;
  product_name: string;
  type: string;
  updated_at: Date;
}