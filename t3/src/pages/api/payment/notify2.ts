/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextApiRequest, type NextApiResponse } from "next";
import { env } from "process";
import { render } from "~/lib/reactmail/render";
import { Resend } from "resend";
import { RecordId } from "surrealdb";
import { type z } from "zod";

import { db } from "~/server/db";
import type { payfast_notify_schema } from "~/lib/payfast/payfast_types";

const handler = async (
  req: Omit<NextApiRequest, "body"> & {
    body: z.infer<typeof payfast_notify_schema>;
  },
  res: NextApiResponse,
) => {
  console.log(req.body);
  console.log(req.body.payment_status);
  const dbc = await db();
  const today = new Date();
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();
  const remainingDays = daysInMonth - today.getDate();
  const expDate = new Date(today.setDate(today.getDate() + remainingDays));

  await dbc.client.insert("Adv_payments", {
    vehicle: new RecordId("vehicle", req.body.custom_str1.split(":")[1]!),
    team: new RecordId("team", req.body.custom_str2.split(":")[1]!),
    amount_fee: req.body.amount_fee,
    bulkPayment: false,
    amount_gross: req.body.amount_gross,
    amount_net: req.body.amount_net,
    email_address: req.body.email_address,
    item_description: req.body.item_description,
    item_name: req.body.item_name,
    m_payment_id: req.body.m_payment_id,
    merchant_id: req.body.merchant_id,
    name_first: req.body.name_first,
    name_last: req.body.name_last,
    payment_date: today.toISOString(),
    payment_status: req.body.payment_status,
    pf_payment_id: req.body.pf_payment_id,
    signature: req.body.signature,

    extra: req.body,
  });
  if (req.body.payment_status === "COMPLETE") {
    const today = new Date();
    const daysInMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
    ).getDate();
    const remainingDays = daysInMonth - today.getDate();
    const expDate = new Date(req.body.custom_str3);
    const result = await dbc.client.query(
      /* surrealql */ `UPDATE vehicle:${req.body.custom_str1.split(":")[1]!} SET published = true,publish_date = d"${today.toISOString()}", exp_date = d"${expDate.toISOString()}",status = "active" ,Ad_paid_date = d"${today.toISOString()}",can_expire = true;`,
    );
  }
  //   const resend = new Resend();
  //   if (req.body.payment_status === "COMPLETE") {
  //     await resend.emails.send({
  //       from: env.RESEND_FROM ?? "",
  //       to: req.body.email_address ?? "",
  //       subject: `Scratch Fix Pro Order Confirmation REF: ${req.body.custom_str1.split(":")[1]!}`,
  //       text: render(
  //         EmailOrderPaid({
  //           client_name: req.body.name_first,
  //           ref: req.body.custom_str1.split(":")[1]!,
  //         }),
  //         {
  //           plainText: true,
  //         },
  //       ),
  //       html: render(
  //         EmailOrderPaid({
  //           client_name: req.body.name_first,
  //           ref: req.body.custom_str1.split(":")[1]!,
  //         }),
  //         {},
  //       ),
  //     });
  //   }
  //   res.end("OK");
};

export default handler;
