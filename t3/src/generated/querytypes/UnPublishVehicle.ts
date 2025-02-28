/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type UnPublishVehicle = [
  UnPublishVehiclequery1[]
]
type UnPublishVehiclequery1 = {
  Acceleration: number;
  Ad_paid_date: Date;
  AirConditioning: boolean;
  AirbagQuantity: number;
  AntiLockBrakingSystemABS: boolean;
  BluetoothConnectivity: boolean;
  BodyType: string;
  CO2Emissions: number;
  CruiseControl: boolean;
  CylinderLayout: string;
  DrivenWheels: string;
  ElectricWindows: boolean;
  EngineCapacity: number;
  EnginePosition: string;
  FinanceAvailable: boolean;
  FrontTyres: string;
  FuelCapacity: number;
  FuelConsumption: number;
  FuelRange: number;
  FuelType: string;
  HeatedSeats: boolean;
  ISOFIXChildSeatMountings: boolean;
  IntroductionDate: Date;
  LaneDepartureWarning: boolean;
  MaximumPower: number;
  MaximumSpeed: number;
  MaximumTorque: number;
  MultiFunctionSteeringWheel: boolean;
  Navigation: boolean;
  NewUsed: string;
  NoOfDoors: number;
  OnBoardComputer: boolean;
  PowerSteering: boolean;
  PreviousOwners: number;
  RearTyres: string;
  RemoteCentralLocking: boolean;
  SeatsQuantity: number;
  ServiceHistory: string;
  ServiceInterval: string;
  SoldAmount: number;
  StabilityControl: boolean;
  Sunroof: boolean;
  TractionControl: boolean;
  Transmission: string;
  TyrePressueSensor: boolean;
  USBPort: boolean;
  XenonHeadlights: boolean;
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
  purchasedFrom: RecordId;
  seller_description: string;
  sold: boolean;
  soldBy: string;
  soldDate: Date;
  soldTo: string;
  status: string;
  stock_code: number;
  team: RecordId;
  varient: string;
  vinNumber: string;
  year: number;
}