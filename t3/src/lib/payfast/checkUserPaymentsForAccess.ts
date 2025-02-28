/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { db } from "~/server/db";
import { payfast_notify_schema } from "~/lib/payfast/payfast_types";
import moment from "moment";
import { z } from "zod";

export async function checkUserPaymentsForAccess(inputs: { user_id: string }) {
  // const payments = await db
  //   .selectFrom("payments")
  //   .selectAll()
  //   .where("user_id", "=", inputs.user_id)
  //   .execute();

  const dbs = await db();

  const payments_raw = (await dbs.client.query(
    `select * from payment where userid = ${inputs.user_id};`,
  )) as [unknown];

  const payments = z
    .strictObject({
      type: z.string(),
      id: z.string(),
      created_at: z.date(),
      invoice_id: z.string(),
      purchase_id: z.string(),
      raw_data: z.unknown(),
      user_id: z.string(),
    })
    .array()
    .parse(payments_raw[0]);

  const payments_parsed = payments.map((p) => ({
    ...p,
    payfast: payfast_notify_schema.parse(p.raw_data),
    raw_data: undefined,
  }));

  // check for full access
  const purchased_fullaccess_onceoff = payments_parsed.find(
    (i) =>
      i.payfast.item_name === "Once-Off" &&
      i.payfast.payment_status === "COMPLETE", //todo check
  );

  // check for subscriptions.. monthly and yearly dates.
  const yearly_subs = payments_parsed.find(
    (i) =>
      i.payfast.item_name === "Yearly" &&
      i.payfast.payment_status === "COMPLETE" &&
      moment(i.created_at).add(1, "year").toDate().getTime() >
        new Date().getTime(),
  );

  const monthly_subs = payments_parsed.find(
    (i) =>
      i.payfast.item_name === "Monthly" &&
      i.payfast.payment_status === "COMPLETE" &&
      moment(i.created_at).add(1, "month").toDate().getTime() >
        new Date().getTime(),
  );

  const active_subs = {
    purchased_fullaccess_onceoff: Boolean(purchased_fullaccess_onceoff),
    yearly_subs: Boolean(yearly_subs),
    monthly_subs: Boolean(monthly_subs),
  };

  const has_active_sub =
    active_subs.purchased_fullaccess_onceoff ||
    active_subs.yearly_subs ||
    active_subs.monthly_subs;

  // update table if different.
  // await db
  //   .updateTable("user")
  //   .set({ active_subscription: has_active_sub })
  //   .where("id", "=", inputs.user_id)
  //   .where("active_subscription", "!=", has_active_sub)
  //   .executeTakeFirstOrThrow();

  return {
    has_active_sub,
    ...active_subs,
  };
}
