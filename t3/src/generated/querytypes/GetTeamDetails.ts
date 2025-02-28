/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetTeamDetails = [GetTeamDetailsquery1];
type GetTeamDetailsquery1 = {
  CMS_Dealer: boolean;
  CMS_Dealer_Code: string;
  city: string;
  company_name: string;
  company_reg: string;
  company_trading_name: string;
  currency: string;
  currency_symbol: string;
  dealershipDescription: string;
  description: string;
  freeTrial: boolean;
  freeTrialEndDate: Date;
  friday: boolean;
  fridayClose: string;
  fridayOpen: string;
  id: RecordId;
  image: string;
  leads_email: string;
  market_page_view: boolean;
  monday: boolean;
  mondayClose: string;
  mondayOpen: string;
  name: string;
  office_cell: string;
  owner: RecordId;
  postal_code: string;
  private_seller: boolean;

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
  vat_no: string;
  vat_percentage: number;
  wednesday: boolean;
  wednesdayClose: string;
  wednesdayOpen: string;
};
