import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { signIn, useSession } from "next-auth/react";
import { BiWalletAlt } from "react-icons/bi";
import { useState } from "react";
import { WalletConnectPanel } from "./WalletConnectPanel";
import Link from "next/link";
import * as React from "react";
// library we use to interact with the solana json rpc api
import * as web3 from "@solana/web3.js";
// allows us access to methods and components which give us access to the solana json rpc api and user's wallet data
import * as walletAdapterReact from "@solana/wallet-adapter-react";
// allows us to choose from the available wallets supported by the wallet adapter
import * as walletAdapterWallets from "@solana/wallet-adapter-wallets";
// imports a component which can be rendered in the browser
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
// applies the styling to the components which are rendered on the browser
require("@solana/wallet-adapter-react-ui/styles.css");
// imports methods for deriving data from the wallet's data store
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { FC } from "react";
const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Accommodation", href: "/accommodation", current: false },
  { name: "Rules", href: "/houserules/english", current: false },
  { name: "Admin", href: "/admin", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const session = useSession();
  const [isWalletPanelOpen, setIsWalletPanelOpen] = useState(false);
  const [balance, setBalance] = React.useState<number | null>(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  // when the status of `connection` or `publicKey` changes, we execute the code block below
  React.useEffect(() => {
    const getInfo = async () => {
      if (connection && publicKey) {
        // we get the account info for the user's wallet data store and set the balance in our application's state
        const info = await connection.getAccountInfo(publicKey);
        setBalance(info ? info.lamports / web3.LAMPORTS_PER_SOL : 0);
      }
    };
    void getInfo();
    // the code above will execute whenever these variables change in any way
  }, [connection, publicKey]);

  return (
    <>
      <Disclosure as="nav" className="">
        <div className="mx-auto max-w-6xl  ">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-neutral-400 hover:bg-neutral-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <Link href={"./"}>
                  <span className="font-serif text-3xl font-bold ">
                    <span className="pr-1 text-white">NFT</span>
                    <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                      <span>S</span>
                      <span className="text-2xl">EA</span>
                    </span>
                  </span>
                </Link>
              </div>
              <div className="hidden pl-10 text-sm md:block">
                <Link
                  className="hidden rounded-md p-2 font-bold text-white hover:bg-gradient-to-r hover:from-blue-500/70 hover:to-pink-500/70 md:block"
                  href={"./create"}
                >
                  Create
                </Link>
              </div>
              <div className="hidden pl-10 text-sm md:block">
                <Link
                  className="hidden rounded-md p-2 font-bold text-white hover:bg-gradient-to-r hover:from-blue-500/70 hover:to-pink-500/70 md:block"
                  href={"./myNft"}
                >
                  My NFT&apos;s
                </Link>
              </div>
            </div>

            <div className="flex flex-row gap-2 text-sm">
              <button className="hidden rounded-md p-2 font-bold text-white hover:bg-gradient-to-r hover:from-blue-500/70 hover:to-pink-500/70 md:block">
                Explore Marketplace
              </button>
              <button
                onClick={() => setIsWalletPanelOpen(true)}
                className="hidden rounded-md p-2 font-bold text-white hover:bg-gradient-to-r hover:from-blue-500/70 hover:to-pink-500/70 md:block"
              >
                <BiWalletAlt size={23} />
              </button>
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${publicKey ? "bg-green-500" : "bg-red-500"}`}
                />
                <span className="text-sm font-medium text-neutral-300">
                  {publicKey ? "Connected" : "Disconnected"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-300 hover:bg-neutral-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium",
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>

      <WalletConnectPanel
        isOpen={isWalletPanelOpen}
        onClose={() => setIsWalletPanelOpen(false)}
      />
    </>
  );
}
