export function PayFastButton3(props: {
  paymentFirstName: string;

  paymentEmail: string;
  team: string;

  vehicles: string;
  paymentConfirmAmount: number;
  sandbox?: boolean;
}) {
  const options: {
    action_url: string;
    merchant_id: string;
    merchant_key: string;
  } =
    props.sandbox === true
      ? {
          action_url: "https://sandbox.payfast.co.za/eng/process",
          merchant_id: "10035212",
          merchant_key: "kv8m5x4abmd1r",
        }
      : {
          action_url: "https://www.payfast.co.za/eng/process",
          // scratchfixpro live payfast
          merchant_id: "25269342",
          merchant_key: "g04cts0fr62b1",
        };

  if (!window) return <div>loading..</div>;

  return (
    <form action={options.action_url} method="POST">
      <input type="hidden" name="merchant_id" value={options.merchant_id} />
      <input type="hidden" name="merchant_key" value={options.merchant_key} />

      <input
        type="hidden"
        id="paymentFirstName"
        name="name_first"
        value={props.paymentFirstName}
      />

      <input
        type="hidden"
        id="paymentEmail"
        name="email_address"
        value={props.paymentEmail}
      />

      <input
        type="hidden"
        id="paymentConfirmAmount"
        name="amount"
        value={props.paymentConfirmAmount.toFixed(2)}
      />

      <input type="hidden" name="item_name" value="Auto Dex Advertise" />
      <input type="hidden" name="item_description" value="Advertise Vehicle" />

      <input type="hidden" id="team" name="custom_str2" value={props.team} />

      <input
        type="hidden"
        id="Vehicles"
        name="custom_str4"
        value={props.vehicles}
      />
      <input
        type="hidden"
        name="return_url"
        value={
          window.location.origin
          //   `/payment/${props.paymentUuid.toString().split(":")[1]!}/success`
        }
      />
      <input
        type="hidden"
        name="cancel_url"
        value={window.location.origin + "/"}
      />
      <input
        type="hidden"
        name="notify_url"
        value={window.location.origin + "/api/payment/notify3"}
      />

      <button
        id="payment"
        className="rounded-sm bg-green-600 p-1 px-4 font-bold text-white  hover:bg-green-500  hover:shadow-lg"
      >
        Renew Advertisements {props.sandbox && "sandbox"}
      </button>
    </form>
  );
}
