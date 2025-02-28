import type { Uuid, RecordId } from "surrealdb";
export type VehicleMakesModelsVarient = [VehicleMakesModelsVarientquery1[]];
export type VehicleMakesModelsVarientquery1 = {
  id: RecordId;
  make: string;
  model: string;
  varient: string;
  mmCode: string;
};
