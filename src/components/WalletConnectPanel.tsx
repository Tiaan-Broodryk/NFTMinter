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

const Finished = () => {
  // allows us to add the wallet account balance to our react function component
  const [balance, setBalance] = React.useState<number | null>(0);
  // we specify which network we want to connect to
  const endpoint = web3.clusterApiUrl("devnet");
  // we specify which wallets we want our wallet adapter to support
  const wallets = [new walletAdapterWallets.PhantomWalletAdapter()];

  // connection context object that is injected into the browser by the wallet
  const { connection } = useConnection();
  // user's public key of the wallet they connected to our application
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
      <div className="w-full text-center ">
        <WalletMultiButton className="" />
        <div className="mt-2 flex items-center justify-between rounded-lg bg-black p-3">
          <span className="text-sm font-medium text-neutral-300">
            Wallet Status
          </span>
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

      {/* <pre>{JSON.stringify(connection, null, 2)}</pre> */}
    </>
  );
};

interface WalletConnectPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletConnectPanel: FC<WalletConnectPanelProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0  transition-opacity " onClick={onClose} />

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-[400px] transform border-l border-neutral-500 bg-black p-6 shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Wallet Connection Button */}
        <div className="flex justify-center">
          <WalletMultiButton className="!bg-gradient-to-r !from-purple-500 !to-pink-500 !px-6 !py-3 !text-base hover:!from-purple-600 hover:!to-pink-600" />
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6 text-center">
          <p className="text-sm text-gray-400">
            Dont have a wallet?{" "}
            <a
              href="https://docs.solana.com/wallet-guide"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text font-bold text-transparent hover:from-blue-600 hover:to-pink-600"
            >
              Learn more
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
