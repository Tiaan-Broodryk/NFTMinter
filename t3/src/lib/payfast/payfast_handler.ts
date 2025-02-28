import { type NextApiRequest, type NextApiResponse } from "next";

import { RecordId } from "surrealdb";
import { z } from "zod";

import { payfast_notify_schema } from "~/lib/payfast/payfast_types";
import { db } from "~/server/db";
import { api } from "~/utils/api";

/**
 *
 * To use edit:
 *
 * `/src/pages/api/payment/notify.ts`
 *
 * Default export this handler
 *
 * ```ts
 * import { payfast_handler } from "~/lib/payfast/payfast_handler";
 *
 * export default payfast_handler;
 * ```
 */

export const payfast_handler = async (
  req: Omit<NextApiRequest, "body"> & {
    body: z.infer<typeof payfast_notify_schema>;
  },
  res: NextApiResponse,
) => {
  const parsed = payfast_notify_schema.parse(req.body);

  // const find_user = await db
  //   .selectFrom("user")
  //   .select(["id"])
  //   .where("email", "=", parsed.email_address)
  //   .executeTakeFirstOrThrow();

  const dbs = await db();
  const find_user_req = await dbs.client.query(
    `select id from only user where email = "${parsed.email_address}" limit 1;`,
  );

  const find_user = z
    .strictObject({ id: z.coerce.string() })
    .parse(find_user_req[0]);

  // await db
  //   .insertInto("payments")
  //   .values({
  //     id: crypto.randomUUID(),
  //     invoice_id: crypto.randomUUID(),
  //     purchase_id: crypto.randomUUID(),
  //     type: "payfast",
  //     user_id: find_user.id,
  //     created_at: new Date(),
  //     raw_data: JSON.stringify(req.body),
  //   })
  //   .returningAll()
  //   .executeTakeFirstOrThrow();

  await dbs.client.insert("payment", {
    type: "payfast",
    user_id: new RecordId("user", find_user.id.split(":")[1]!),
    created_at: new Date(),
    team: new RecordId("team", req.body.m_payment_id.split(":")[1]!),
    raw_data: req.body,
  });

  const result = await dbs.client.query(
    /* surrealql */ `update ${req.body.m_payment_id} SET freeTrial = false;`,
  );

  res.end("OK");
};
