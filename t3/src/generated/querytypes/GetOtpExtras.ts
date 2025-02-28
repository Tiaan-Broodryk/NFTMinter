/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Uuid, RecordId } from "surrealdb";
export type GetOtpExtras = [GetOtpExtrasquery1[]];
type GetOtpExtrasquery1 = {
  extra_amount: number;
  extra_description: string;
  id: RecordId;
  otp_id: RecordId;
  team: RecordId;
  vehicle_id: RecordId;
};
