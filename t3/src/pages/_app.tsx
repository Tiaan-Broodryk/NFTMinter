import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Montserrat } from "next/font/google";

import { api } from "~/utils/api";
import { Tooltip } from "react-tooltip";

import "~/styles/globals.css";
import "~/styles/mapboxoverrides.css";

const font = Montserrat({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={`${font.className}`}>
        <Component {...pageProps} />
        <Tooltip id="my-tooltip" />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
