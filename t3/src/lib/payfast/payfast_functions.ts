import { z } from "zod";
import { createHash } from "crypto";
import { env } from "~/env";

export const payfast_schema = z.object({
  merchant_id: z.string(),
  merchant_key: z.string(),
  return_url: z.string(),
  cancel_url: z.string(),
  notify_url: z.string(),
  name_first: z.string(),
  name_last: z.string(),
  email_address: z.string(),
  cell_number: z.string().optional(),
  // Transaction details
  m_payment_id: z.string(),
  amount: z.string(),
  item_name: z.string(),
  // Transaction options
  // Payment methods
  // Additional subscription form fields
  subscription_type: z.string().optional(),
  /** date (YYYY-MM-DD) | OPTIONAL  The date from which future subscription payments will be made. Eg. 2020-01-01. Defaults to current date if not set.*/
  billing_date: z.string().optional(),
  /** decimal | OPTIONAL
Future recurring amount for the subscription in ZAR. Defaults to the ‘amount’ value if not set. There is a minimum value of 5.00.
It is possible to set up a subscription or tokenization payment with an initial amount of R0.00. This would be used with subscriptions if the first cycle/period is free, or, in the case of tokenization payments it is used to set up the customers account on the merchants site, allowing for future payments. If the initial amount is R0.00 the customer will be redirected to Payfast, where they will input their credit card details and go through 3D Secure, but no money will be deducted. */
  recurring_amount: z.string().optional(),
  /** integer, 1 char | REQUIRED FOR SUBSCRIPTIONS
The cycle period.   
   1 - Daily   
   2 - Weekly   
   3 - Monthly   
   4 - Quarterly   
   5 - Biannually   
   6 - Annual */
  frequency: z.string().optional(),
  /** integer, 1 char | REQUIRED FOR SUBSCRIPTIONS
The number of payments/cycles that will occur for this subscription. Set to 0 for indefinite subscription. */
  cycles: z.string().optional(),
  /** boolean | OPTIONAL
Send the merchant an email notification 7 days before a subscription trial ends, or before a subscription amount increases.
This setting is enabled by default and can be changed via the merchant dashboard: Settings -> Recurring Billing. */
  subscription_notify_email: z.string().optional(),
  /** boolean | OPTIONAL
Send the merchant a webhook notification 7 days before a subscription trial ends, or before a subscription amount increases.
The webhook notification URL can be set via the merchant dashboard: Settings -> Recurring Billing. */
  subscription_notify_webhook: z.string().optional(),
  /** boolean | OPTIONAL
Send the buyer an email notification 7 days before a subscription trial ends, or before a subscription amount increases.
This setting is enabled by default and can be changed via the merchant dashboard: Settings -> Recurring Billing. */
  subscription_notify_buyer: z.string().optional(),
});
export const payfast_update_schema = z.object({
  token: z.string(),
  merchant_id: z.string(),
  merchant_key: z.string(),
  return_url: z.string(),
  cancel_url: z.string(),
  notify_url: z.string(),

  email_address: z.string(),
  cell_number: z.string().optional(),
  // Transaction details

  amount: z.string(),

  // Transaction options
  // Payment methods
  // Additional subscription form fields
  subscription_type: z.string().optional(),
  /** date (YYYY-MM-DD) | OPTIONAL  The date from which future subscription payments will be made. Eg. 2020-01-01. Defaults to current date if not set.*/
  billing_date: z.string().optional(),
  /** decimal | OPTIONAL
Future recurring amount for the subscription in ZAR. Defaults to the ‘amount’ value if not set. There is a minimum value of 5.00.
It is possible to set up a subscription or tokenization payment with an initial amount of R0.00. This would be used with subscriptions if the first cycle/period is free, or, in the case of tokenization payments it is used to set up the customers account on the merchants site, allowing for future payments. If the initial amount is R0.00 the customer will be redirected to Payfast, where they will input their credit card details and go through 3D Secure, but no money will be deducted. */
  recurring_amount: z.string().optional(),
  /** integer, 1 char | REQUIRED FOR SUBSCRIPTIONS
The cycle period.   
   1 - Daily   
   2 - Weekly   
   3 - Monthly   
   4 - Quarterly   
   5 - Biannually   
   6 - Annual */
  frequency: z.string().optional(),
  /** integer, 1 char | REQUIRED FOR SUBSCRIPTIONS
The number of payments/cycles that will occur for this subscription. Set to 0 for indefinite subscription. */
  cycles: z.string().optional(),
  /** boolean | OPTIONAL
Send the merchant an email notification 7 days before a subscription trial ends, or before a subscription amount increases.
This setting is enabled by default and can be changed via the merchant dashboard: Settings -> Recurring Billing. */
  subscription_notify_email: z.string().optional(),
  /** boolean | OPTIONAL
Send the merchant a webhook notification 7 days before a subscription trial ends, or before a subscription amount increases.
The webhook notification URL can be set via the merchant dashboard: Settings -> Recurring Billing. */
  subscription_notify_webhook: z.string().optional(),
  /** boolean | OPTIONAL
Send the buyer an email notification 7 days before a subscription trial ends, or before a subscription amount increases.
This setting is enabled by default and can be changed via the merchant dashboard: Settings -> Recurring Billing. */
  subscription_notify_buyer: z.string().optional(),
});

export function generateAPISignature(
  data: Record<string, string>,
  passPhrase: string,
) {
  // Arrange the array by key alphabetically for API calls
  const ordered_data: Record<string, string> = {};
  Object.keys(data)
    .sort()
    .forEach((key) => {
      ordered_data[key] = data[key]!;
    });
  data = ordered_data;

  const ndata = Object.entries(data).sort((a, b) => a[0].localeCompare(b[0]));
  let str1 = "";
  for (const [key, value] of ndata) {
    if (value != "" && key != "signature" && key != "testing") {
      str1 = str1 + key + "=" + encodeURIComponent(value) + "&";
    }
  }
  str1 = str1.slice(0, -1);

  const hash_t = createHash("md5").update(str1).digest("hex");

  // Create the get string
  let getString = "";
  for (const key in data) {
    getString +=
      key + "=" + encodeURIComponent(data[key]!).replace(/%20/g, "+") + "&";
  }

  // Remove the last '&'
  getString = getString.substring(0, getString.length - 1);
  const outputQueryString = getString + "";
  if (passPhrase !== null) {
    getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(
      /%20/g,
      "+",
    )}`;
  }

  // Hash the data and create the signature
  const signature = createHash("md5").update(getString).digest("hex");
  return {
    signature,
    outputQueryString,
    ordered_data,
    getString,
    hash_t,
    ndata: Object.fromEntries(ndata),
  };
}

export function generateSignature(
  data: Record<string, string>,
  passPhrase: string,
) {
  // Create parameter string
  let pfOutput = "";
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] !== "") {
        pfOutput += `${key}=${encodeURIComponent(data[key]!.trim()).replace(
          /%20/g,
          "+",
        )}&`;
      }
    }
  }

  // Remove last ampersand
  let getString = pfOutput.slice(0, -1);
  if (passPhrase !== null) {
    getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(
      /%20/g,
      "+",
    )}`;
  }

  const signature = createHash("md5").update(getString).digest("hex");

  return { pfOutput: pfOutput.slice(0, -1), signature };
}

/**
 * https://developers.payfast.co.za/api#subscription-object-fetch
 *
 * Should a subscription be paused the remaining payments (cycles) will remain untouched. The end date of the subscription moves on by the number of paused frequency period(s). Effectively the customer gains a payment gap and the number of payments will still be the same as originally requested. A free month(s) could be provided by pausing (pause) a subscription and reducing the number of cycles by making an update to the subscription.
 *
 */
export async function payfast_subscription_update(input: {
  token: string;

  amount?: number;
}) {
  const data = {
    "merchant-id": env.PAYFAST_MERCHANT_ID,
    passphrase: env.PAYFAST_SALT_PASSPHRASE,
    version: "v1",
    timestamp: new Date().toISOString().slice(0, 19),
  };

  const sig = generateAPISignature(data, env.PAYFAST_SALT_PASSPHRASE);

  const headers = sig.ndata;
  delete headers.passphrase;
  headers.signature = sig.hash_t;

  const result = (await fetch(
    `https://api.payfast.co.za/subscriptions/${input.token}/update${
      env.PAYFAST_URL.includes("sandbox") ? "?testing=true" : ""
    }`,
    {
      method: "put",
      headers,
      redirect: "follow",
    },
  ).then((response) => response.json())) as unknown;

  console.log(result);

  return true;
}
export async function payfast_subscription_pause(input: {
  token: string;
  cycles?: number;
}) {
  const data = {
    "merchant-id": env.PAYFAST_MERCHANT_ID,
    passphrase: env.PAYFAST_SALT_PASSPHRASE,
    version: "v1",
    timestamp: new Date().toISOString().slice(0, 19),
  };

  const sig = generateAPISignature(data, env.PAYFAST_SALT_PASSPHRASE);

  const headers = sig.ndata;
  delete headers.passphrase;
  headers.signature = sig.hash_t;

  const result = (await fetch(
    `https://api.payfast.co.za/subscriptions/${input.token}/pause${
      env.PAYFAST_URL.includes("sandbox") ? "?testing=true" : ""
    }`,
    {
      method: "put",
      headers,
      redirect: "follow",
    },
  ).then((response) => response.json())) as unknown;

  console.log(result);

  return true;
}

export async function payfast_subscription_unpause(input: { token: string }) {
  const data = {
    "merchant-id": env.PAYFAST_MERCHANT_ID,
    passphrase: env.PAYFAST_SALT_PASSPHRASE,
    version: "v1",
    timestamp: new Date().toISOString().slice(0, 19),
  };

  const sig = generateAPISignature(data, env.PAYFAST_SALT_PASSPHRASE);

  const headers = sig.ndata;
  delete headers.passphrase;
  headers.signature = sig.hash_t;

  const result = (await fetch(
    `https://api.payfast.co.za/subscriptions/${input.token}/unpause${
      env.PAYFAST_URL.includes("sandbox") ? "?testing=true" : ""
    }`,
    {
      method: "put",
      headers,
      redirect: "follow",
    },
  ).then((response) => response.json())) as unknown;

  console.log(result);

  return true;
}

export async function payfast_subscription_cancel(input: { token: string }) {
  const data = {
    "merchant-id": env.PAYFAST_MERCHANT_ID,
    passphrase: env.PAYFAST_SALT_PASSPHRASE,
    version: "v1",
    timestamp: new Date().toISOString().slice(0, 19),
  };

  const sig = generateAPISignature(data, env.PAYFAST_SALT_PASSPHRASE);

  const headers = sig.ndata;
  delete headers.passphrase;
  headers.signature = sig.hash_t;

  const result = (await fetch(
    `https://api.payfast.co.za/subscriptions/${input.token}/cancel${
      env.PAYFAST_URL.includes("sandbox") ? "?testing=true" : ""
    }`,
    {
      method: "put",
      headers,
      redirect: "follow",
    },
  ).then((response) => response.json())) as unknown;

  console.log(result);

  return true;
}

export async function payfast_subscription_fetch(input: {
  token: string | undefined;
}) {
  const data = {
    "merchant-id": env.PAYFAST_MERCHANT_ID,
    passphrase: env.PAYFAST_SALT_PASSPHRASE,
    version: "v1",
    timestamp: new Date().toISOString().slice(0, 19),
  };

  const sig = generateAPISignature(data, env.PAYFAST_SALT_PASSPHRASE);

  const headers = sig.ndata;
  delete headers.passphrase;
  headers.signature = sig.hash_t;

  const url = `https://api.payfast.co.za/subscriptions/${input.token}/fetch${
    env.PAYFAST_URL.includes("sandbox") ? "?testing=true" : ""
  }`;

  const result = (await fetch(url, {
    method: "get",
    headers,
    redirect: "follow",
  }).then((response) => response.json())) as {
    code: number;
    status: string;
    data: unknown;
  };

  const parse_result = z
    .discriminatedUnion("code", [
      z.strictObject({
        code: z.literal(400),
        status: z.string(),
        data: z.strictObject({ response: z.boolean() }),
      }),
      z.strictObject({
        code: z.literal(200),
        status: z.string(),
        data: z.strictObject({
          response: z.strictObject({
            amount: z.number(),
            cycles: z.number(),
            cycles_complete: z.number(),
            frequency: z.number(),
            run_date: z.coerce.date(),
            status: z.number(),
            status_reason: z.string(),
            status_text: z.string(),
            token: z.string(),
          }),
        }),
      }),
    ])
    .parse(result);

  return parse_result;
}
