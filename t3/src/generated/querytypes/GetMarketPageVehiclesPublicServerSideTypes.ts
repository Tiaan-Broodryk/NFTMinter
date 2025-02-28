/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetMarketPageVehiclesPublicServerSideTypes = [
  GetMarketPageVehiclesPublicServerSideTypesquery1[],
];
type GetMarketPageVehiclesPublicServerSideTypesquery1 = {
  BodyType: string;
  FinanceAvailable?: boolean;
  FuelType: string;
  NewUsed: string;
  Transmission: string;
  advertisingAmount: number;
  exp_date: Date;
  id: RecordId;
  make: string;
  market_page: boolean;
  model: string;
  odoReading: number;
  publish_date: Date;
  VehicleExtraDesc: boolean;
  VehicleExtraDescText: string;
  published: boolean;
  team: Team;
  varient: string;
  vehicle_images: Vehicleimages[];
  year: number;
};
type Vehicleimages = {
  id: RecordId;
  order: number;
  src: string;
  vehicle_id: RecordId;
};
type Team = {
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
  wednesday: boolean;
  wednesdayClose: string;
  wednesdayOpen: string;
  team_type?: string;
  company_reg?: string;
  company_trading_name?: string;
  currency?: string;
  currency_symbol?: string;
  vat_no?: string;
  vat_percentage?: number;
};
