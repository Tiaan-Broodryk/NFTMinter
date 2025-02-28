import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { CFTrace } from "./trace";
import { api } from "~/utils/api";

export function useVisitCount() {
  const router = useRouter();

  const cftrace = useQuery({
    queryKey: ["CFTrace"],
    queryFn: CFTrace,
  });

  api.visit.useQuery(
    { trace: cftrace.data!, query: router.query, pathname: router.pathname },
    {
      enabled: Boolean(cftrace.data) && Boolean(router.pathname),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  return {};
}
