/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { unique } from "moderndash";
import { payment_z } from "~/types/payment";
import { payfast_subscription_fetch } from "./payfast_functions";
import { type Queries } from "~/generated/combined";
import { type NSurreal } from "../netron_surreal";

export async function get_subscriptions(props: {
  db: NSurreal<Queries>;
  email: string;
  team_id: string;
}) {
  const res = await props.db.query(
    `SELECT * FROM payment where raw_data.email_address = "${props.email}" and team = ${props.team_id};`,
    "PayFastGetSubscriptions",
    {
      skip_write: false,
    },
  );

  const payments = payment_z.array().parse(res[0]);
  const tokens = unique(
    payments
      .map((payment) => payment.raw_data.token)
      .filter((token) => token !== undefined),
  );
  const subs = await Promise.all(
    tokens?.map((token) => payfast_subscription_fetch({ token })),
  );
  return subs.filter((i) => i.code !== 400);
}
