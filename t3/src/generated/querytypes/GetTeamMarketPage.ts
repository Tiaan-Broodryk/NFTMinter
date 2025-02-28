/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetTeamMarketPage = [
  GetTeamMarketPagequery1[]
]
type GetTeamMarketPagequery1 = {
  city: string;
  company_name: string;
  dealershipDescription: string;
  description: string;
  freeTrial: boolean;
  friday: boolean;
  fridayClose: string;
  fridayOpen: string;
  id: RecordId;
  image: string;
  leads_email: string;
  monday: boolean;
  mondayClose: string;
  mondayOpen: string;
  name: string;
  office_cell: string;
  owner: RecordId;
  postal_code: string;
  pro: boolean;
  province: string;
  saturday: boolean;
  saturdayClose: string;
  saturdayOpen: string;
  select_profile: boolean;
  slug: string;
  street_address: string;
  sunday: boolean;
  sundayClose: string;
  sundayOpen: string;
  team_type: string;
  thursday: boolean;
  thursdayClose: string;
  thursdayOpen: string;
  tuesday: boolean;
  tuesdayClose: string;
  tuesdayOpen: string;
  wednesday: boolean;
  wednesdayClose: string;
  wednesdayOpen: string;
}