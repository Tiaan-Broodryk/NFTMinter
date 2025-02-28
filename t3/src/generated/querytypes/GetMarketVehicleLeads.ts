/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetMarketVehicleLeads = [
  GetMarketVehicleLeadsquery1[]
]
type GetMarketVehicleLeadsquery1 = {
  email: string;
  id: RecordId;
  lead_date: Date;
  message: string;
  name: string;
  phone: string;
  read: boolean;
  team: RecordId;
  vehicle: Vehicle;
}
type Vehicle = {
  AirConditioning?: boolean;
  AirbagQuantity?: number;
  AntiLockBrakingSystemABS?: boolean;
  BluetoothConnectivity?: boolean;
  BodyType: string;
  CO2Emissions?: number;
  CruiseControl?: boolean;
  CylinderLayout: string;
  DrivenWheels: string;
  ElectricWindows?: boolean;
  EngineCapacity?: number;
  EnginePosition: string;
  FinanceAvailable: boolean;
  FrontTyres: string;
  FuelCapacity?: number;
  FuelConsumption?: number;
  FuelRange?: number;
  FuelType: string;
  HeatedSeats?: boolean;
  ISOFIXChildSeatMountings?: boolean;
  IntroductionDate?: Date;
  LaneDepartureWarning?: boolean;
  MaximumPower?: number;
  MaximumSpeed?: number;
  MaximumTorque?: number;
  MultiFunctionSteeringWheel?: boolean;
  Navigation?: boolean;
  NewUsed: string;
  NoOfDoors?: number;
  OnBoardComputer?: boolean;
  PowerSteering?: boolean;
  PreviousOwners: number;
  RearTyres: string;
  RemoteCentralLocking?: boolean;
  SeatsQuantity?: number;
  ServiceHistory: string;
  ServiceInterval: string;
  SoldAmount: number;
  StabilityControl?: boolean;
  TractionControl?: boolean;
  Transmission: string;
  TyrePressueSensor?: boolean;
  USBPort?: boolean;
  XenonHeadlights?: boolean;
  advertisingAmount: number;
  can_expire: boolean;
  color: string;
  created_by: RecordId;
  engineNumber: string;
  exp_date: Date;
  id: RecordId;
  licNumber: string;
  make: string;
  market_page: boolean;
  mmCode: number;
  model: string;
  odoReading: number;
  publish_date: Date;
  published: boolean;
  purchaseAmount: number;
  purchaseDate: Date;
  purchasedBy: string;
  purchasedFrom: null;
  seller_description: string;
  sold: boolean;
  soldBy: string;
  soldDate: Date;
  soldTo: string;
  status: string;
  stock_code: number;
  team: RecordId;
  varient: string;
  vehicle_specs?: boolean;
  vinNumber: string;
  year: number;
}