/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
          
          import type { Uuid, RecordId } from "surrealdb";
export type GetListingImages = [
 GetListingImagesquery1[]
]
type GetListingImagesquery1 = {
  Order: number;
  id: RecordId;
  image_url: string;
  listing_id: RecordId;
}