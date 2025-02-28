import type { Uuid, RecordId } from "surrealdb";
export type GetVehicleCosts = [
  GetVehicleCostsquery1[]
]
type GetVehicleCostsquery1 = {
  amount: number;
  created_by: string;
  date: Date;
  description: string;
  id: RecordId;
  name: string;
  supplier: string;
  type: string;
  vehicle_id: RecordId;
}