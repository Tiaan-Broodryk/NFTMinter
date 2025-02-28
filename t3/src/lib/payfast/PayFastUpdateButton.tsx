import { Loading } from "~/atoms";
import { type RouterInputs, api } from "~/utils/api";
import React, { type ReactNode, useEffect, useState } from "react";
import { cn } from "~/utils/cn";
import { env } from "~/env";
function NoSSR(props: { children: ReactNode }) {
  const [showChild, setShowChild] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    if (!showChild) setShowChild(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return <></>;
  }

  return <>{props.children}</>;
}

export type PaymentSubscriptionFrequency =
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "biannually"
  | "annual";

type PayFastButtonProps = {
  amount: number;
  paymentUuid: string;

  paymentEmail: string;
  token: string;
  // paymentTelephone: string;
  // amount: number;

  item_description: string;

  className?: string;
  children?: ReactNode;
} & (
  | {
      subscription_type: "onceoff";
    }
  | {
      subscription_type: "subscription";
      frequency: PaymentSubscriptionFrequency;
      /** The number of payments/cycles that will occur for this subscription. Set to 0 for indefinite subscription. */
      cycles: number;
      recurring_amount?: number;
    }
  | {
      subscription_type: "tokenization";
    }
);

export function PayFastUpdateButton(props: PayFastButtonProps) {
  return (
    <NoSSR>
      <PayFastButtonInside {...props} />
    </NoSSR>
  );
}

export function PayFastButtonInside(props: PayFastButtonProps) {
  const payfast_info = api.lib.payfast.get_payfast_info.useQuery();

  const myData: RouterInputs["lib"]["payfast"]["generate_signature_update"] = {
    merchant_id: payfast_info.data?.merchant_id ?? "",
    return_url: window.location.origin,
    cancel_url: window.location.origin,
    email_address: props.paymentEmail,

    token: props.token,

    merchant_key: payfast_info.data?.merchant_key ?? "",
    notify_url: window.location.origin + "/api/payment/notify",
    amount: props.amount.toString(),
  };

  if (props.subscription_type === "subscription") {
    myData.subscription_type = "1";
    // billing_date
    if (props.recurring_amount)
      myData.recurring_amount = props.recurring_amount.toString();

    myData.frequency = {
      daily: 1,
      weekly: 2,
      monthly: 3,
      quarterly: 4,
      biannually: 5,
      annual: 6,
    }[props.frequency].toString();
    myData.cycles = "0";

    // if (props.recurring_amount) {
    //   myData.recurring_amount = props.recurring_amount.toString();
    // }
  }

  const signature = api.lib.payfast.generate_signature_update.useQuery(myData, {
    enabled: Boolean(payfast_info.data),
  });

  if (!window) return <div>loading..</div>;
  if (!payfast_info.data)
    return (
      <div
        className={cn(
          "flex h-[40px] flex-col items-center justify-center text-center text-white",
          props.className,
        )}
      >
        <Loading className="mx-auto my-0.5 text-white" />
      </div>
    );
  if (!signature.data)
    return (
      <div
        className={cn(
          "flex h-[40px] flex-col items-center justify-center text-center text-white",
          props.className,
        )}
      >
        <Loading className="mx-auto my-0.5 text-white" />
      </div>
    );

  return (
    <form
      action={`https://api.payfast.co.za/subscriptions/${props.token}/update`}
      method="POST"
    >
      {Object.entries(myData)
        .filter((i) => Boolean(i[1]))
        .map(([key, val]) => (
          <input key={key} name={key} type="hidden" value={val} />
        ))}

      <input name="signature" type="hidden" value={signature.data} />

      <button
        id="payment"
        className={cn(
          "rounded bg-blue-900 p-4 text-white hover:bg-blue-800",
          props.className,
        )}
      >
        {props.children ? (
          props.children
        ) : (
          <>
            {props.subscription_type === "subscription"
              ? "Subscribe"
              : "Pay Now"}
          </>
        )}
      </button>
    </form>
  );
}
