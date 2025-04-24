import type { CreateNftListing } from "./querytypes/CreateNftListing";
import type { GetAllListings } from "./querytypes/GetAllListings";
      
export type Queries = {
  CreateNftListing: CreateNftListing;
  GetAllListings: GetAllListings;
}