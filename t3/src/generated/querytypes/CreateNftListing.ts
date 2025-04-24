/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
          
          import type { Uuid, RecordId } from "surrealdb";
export type CreateNftListing = [
 CreateNftListingquery1[]
]
type CreateNftListingquery1 = {
  created_at: Date;
  creator: string;
  description: string;
  id: RecordId;
  image_url: string;
  listed: boolean;
  mint_address: string;
  price: number;
  title: string;
}