/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetCmsVehicles = [GetCmsVehiclesquery1[]];
type GetCmsVehiclesquery1 = {
  BodyType: string;
  Brand: string;
  Category: string;
  CellNumber: string;
  Classification: string;
  Colour: string;
  Comments: string;
  ContactPerson: string;
  DTCreated: Date | null;
  DTLastService: string;
  DTMaintenancePlanExpiry: Date | null;
  DTNextService: string;
  DTServicePlanExpiry: string;
  DTSpecialPriceExpiry: string;
  DTUpdated: Date | null;
  DTWarrantyExpiry: string;
  DTWarrantyInception: string;
  DealershipID: string;
  DealershipName: string;
  Disclaimer: string;
  Email: string;
  EngineNo: string;
  FSH: string;
  Features: string;
  FuelType: string;
  ID: string;
  InitiationFee: string;
  LastServiceDoneBy: string;
  LastServiceKMS: string;
  MMCode: string;
  MaintenancePlanExpiryKMS: string;
  MaintenancePlanValid: string;
  Mileage: string;
  Model: string;
  ModelRange: string;
  MonthlyAdminFee: string;
  MonthlyRepayment: string;
  MovURL: string;
  NewUsed: string;
  NextServiceKMS: string;
  NumBumpersToBeRepaired: string;
  NumPanelsToBeRepaired: string;
  NumTyresToBeReplaced: string;
  OriginalDealershipID: string;
  Pics: Pics[];
  Price: string;
  RegNo: string;
  Region: string;
  RepaymentBalloonPerc: string;
  RepaymentDepositPerc: string;
  RepaymentInterestRate: string;
  RepaymentTerm: string;
  ServiceBooksProvided: string;
  ServiceHistory: string;
  ServicePlanExpiryKMS: string;
  ServicePlanValid: string;
  SpecialPrice: string;
  StockNo: string;
  StockNoDisplay: string;
  Thumbs: Thumbs[];
  Transmission: string;
  TwoKeys: string;
  Type: string;
  VIN: string;
  WarrantyActive: string;
  WarrantyDescription: string;
  WarrantyDistance: string;
  WarrantyDistanceUnlimited: string;
  Year: string;
  id: RecordId;
};

type Pics = {
  DTCreated: string;
  src: string;
};
type Thumbs = {
  DTCreated: string;

  src: string;
};
