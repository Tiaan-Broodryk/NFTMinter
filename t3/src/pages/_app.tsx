import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Montserrat } from "next/font/google";
import { api } from "~/utils/api";
import { Tooltip } from "react-tooltip";

import "~/styles/globals.css";
import "~/styles/mapboxoverrides.css";
import Nav from "~/components/Nav";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

require("@solana/wallet-adapter-react-ui/styles.css");

const font = Montserrat({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  // Set up Solana wallet configuration
  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <SessionProvider session={session}>
            <main
              className={`${font.className} relative min-h-screen overflow-hidden bg-black px-2`}
            >
              {/* Background gradients */}
              <div className="absolute inset-0">
                {/* Purple glow in top left */}
                <div className="absolute -left-[15%] -top-[20%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-purple-200/40  to-purple-600/30 blur-[20px] lg:h-[600px] lg:w-[600px]" />
                {/* Red/pink glow in bottom right */}
                <div className="absolute -bottom-[5%] -left-[5%] h-[500px] w-[500px] rounded-full bg-purple-600/30 blur-[30px] lg:h-[600px] lg:w-[600px]" />
                <div className="absolute -bottom-[5%] -right-[5%] h-[500px] w-[500px] rounded-full bg-pink-500/20 blur-[30px] lg:h-[600px] lg:w-[600px]" />
                <div className="absolute -right-[5%] -top-[5%] h-[500px] w-[500px] rounded-full bg-yellow-600/30 blur-[30px] lg:h-[600px] lg:w-[600px]" />
                <div className="absolute -bottom-[30%] left-[32%]  h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[30px] lg:h-[600px] lg:w-[600px]" />
                <div className="absolute bottom-[30%] left-[32%]  h-[300px] w-[300px]  rounded-full bg-green-500/20 blur-[30px]" />
                {/* Dark overlay for better contrast */}
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Content */}
              <div className="relative">
                <Nav />
                <Component {...pageProps} />
                <Tooltip id="my-tooltip" />
              </div>
            </main>
          </SessionProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default api.withTRPC(MyApp);
