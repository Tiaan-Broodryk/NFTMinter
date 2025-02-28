import { z } from "zod";
import { payfast_notify_schema } from "~/lib/payfast/payfast_types";

export const payment_z = z.strictObject({
  id: z.coerce.string(),
  created_at: z.date(),
  user_id: z.coerce.string(),
  team: z.coerce.string(),
  // in future more payment types?
  type: z.literal("payfast"),
  raw_data: payfast_notify_schema,
});
