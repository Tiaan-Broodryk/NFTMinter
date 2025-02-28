/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
          
          import type { Uuid, RecordId } from "surrealdb";
export type ListingCreate = [
 ListingCreatequery1[]
]
type ListingCreatequery1 = {
  Description: string;
  Title: string;
  bathrooms: number;
  bedrooms: number;
  braai: boolean;
  id: RecordId;
  parking: number;
  people: number;
  price: number;
  swimmingPool: boolean;
  wifi: boolean;
}