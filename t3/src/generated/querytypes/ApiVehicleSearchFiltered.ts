/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
          
          import type { Uuid, RecordId } from "surrealdb";
export type ApiVehicleSearchFiltered = [
 ApiVehicleSearchFilteredquery1[]
]
type ApiVehicleSearchFilteredquery1 = {
  BodyType: string;
  FinanceAvailable?: boolean;
  FuelType: string;
  NewUsed: string;
  Transmission: string;
  VehicleExtraDesc?: boolean;
  VehicleExtraDescText?: string;
  advertisingAmount: number;
  exp_date: Date;
  id: RecordId;
  make: string;
  market_page: boolean;
  model: string;
  odoReading: number | string;
  publish_date: Date;
  published: boolean;
  team: Team;
  varient: string;
  vehicle_images: Vehicleimages[];
  year: number | string;
}
type Vehicleimages = {
  id: RecordId;
  order: number;
  src: string;
  vehicle_id: RecordId;
}
type Team = {
  city: string;
  company_name: string;
  company_reg?: string;
  company_trading_name?: string;
  currency?: string;
  currency_symbol?: string;
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
  private_seller?: boolean;
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
  thursday: boolean;
  thursdayClose: string;
  thursdayOpen: string;
  tuesday: boolean;
  tuesdayClose: string;
  tuesdayOpen: string;
  vat_no?: string;
  vat_percentage?: number;
  wednesday: boolean;
  wednesdayClose: string;
  wednesdayOpen: string;
  team_type?: string;
  market_page_view?: boolean;
  CMS_Dealer?: boolean;
  CMS_Dealer_Code?: string;
}