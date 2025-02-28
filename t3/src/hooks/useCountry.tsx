/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { CFTrace } from "~/lib/cloudflare/trace";
import { api } from "~/utils/api";

export function useCountry() {
  const router = useRouter();
  const team = router.query.team as string;
  const get_team = api.system.get_team_details.useQuery(
    {
      teamslug: router.query.team as string,
    },
    {
      enabled: Boolean(router.query.team),
    },
  );
  // free exchange rate api.. upgrade to paid in future?
  // https://github.com/fawazahmed0/exchange-api
  // https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/zar.json
  const session = useSession();
  const cftrace = useQuery({
    queryKey: ["CFTrace"],
    queryFn: CFTrace,
  });
  const country_code = get_team.data?.team.currency ?? cftrace.data?.loc;
  const priceapi = api.payment.GetPricePerUser.useQuery({
    country_code,
  });
  return priceapi;
}
