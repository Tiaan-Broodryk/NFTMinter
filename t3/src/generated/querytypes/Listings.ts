/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
          
          import type { Uuid, RecordId } from "surrealdb";
export type Listings = [
 Listingsquery1[]
]
type Listingsquery1 = {
  Description: string;
  Title: string;
  bathrooms: number;
  bedrooms: number;
  braai: boolean;
  id: RecordId;
  listing_images: Listingimages[];
  parking: number;
  people: number;
  price: number;
  swimmingPool: boolean;
  wifi: boolean;
}
type Listingimages = {
  Order: number;
  id: RecordId;
  image_url: string;
  listing_id: RecordId;
}