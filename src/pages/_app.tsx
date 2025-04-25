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
import Link from "next/link";

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
                <div className="absolute -left-[20%] -top-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-purple-600 via-purple-800 to-transparent blur-[20px] lg:h-[800px] lg:w-[800px] xl:h-[1000px] xl:w-[1000px]" />
                {/* <div className="absolute -left-[15%] -top-[20%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-purple-200/40  to-purple-600/30 blur-[20px] lg:h-[1000px] lg:w-[1000px]" /> */}
                {/* Red/pink glow in bottom right */}
                <div className="absolute -bottom-[5%] -left-[20%] h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-purple-900 via-purple-800 to-transparent blur-[20px] lg:h-[800px] lg:w-[800px] xl:h-[1000px] xl:w-[1000px]" />
                <div className="absolute -right-[25%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-red-900 via-pink-800 to-transparent blur-[20px] lg:h-[800px] lg:w-[800px] xl:h-[1000px] xl:w-[1000px]" />
                <div className="absolute -right-[20%] -top-[30%] h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-yellow-600 via-yellow-800 to-transparent blur-[20px] lg:h-[800px] lg:w-[800px] xl:h-[1000px] xl:w-[1000px]" />
                <div className="absolute -bottom-[50%] left-[32%]  h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-800 via-blue-800 to-transparent blur-[20px] lg:h-[800px] lg:w-[800px] xl:h-[1000px] xl:w-[1000px]" />
                <div className="absolute bottom-[30%] left-[32%]  h-[300px] w-[300px]  rounded-full bg-gradient-to-br from-green-600 via-green-800 to-transparent blur-[100px] lg:h-[400px] lg:w-[400px]" />
                {/* Dark overlay for better contrast */}
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Content */}
              <div className="relative">
                <Nav />
                <Component {...pageProps} />
                <Tooltip id="my-tooltip" />
                <footer className="fixed bottom-0 left-0 right-0 w-full bg-black/70 py-4 backdrop-blur-sm md:bg-black md:py-6">
                  <div className="mx-auto max-w-6xl px-4">
                    <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:justify-between">
                      <Link href={"./"}>
                        <span className="font-serif text-2xl font-bold md:text-3xl">
                          <span className="pr-1 text-white">NFT</span>
                          <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                            <span>S</span>
                            <span className="text-xl md:text-2xl">EA</span>
                          </span>
                        </span>
                      </Link>

                      <div className="text-center text-xs text-white md:text-left md:text-sm">
                        NFT Sea 2022 © All rights reserved
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </main>
          </SessionProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default api.withTRPC(MyApp);
