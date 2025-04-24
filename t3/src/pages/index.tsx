import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { LuExternalLink } from "react-icons/lu";
import { api } from "~/utils/api";

interface NFTResponse {
  id: string;
  content: {
    $schema: string;
    json_uri: string;
    files: Array<{
      uri: string;
      cdn_uri: string;
      mime: string;
    }>;
    metadata: {
      attributes: Array<{
        value: string;
        trait_type: string;
      }>;
      description: string;
      name: string;
      symbol: string;
      token_standard: string;
    };
    links: {
      image: string;
      external_url: string;
    };
  };
  authorities: Array<{
    address: string;
    scopes: string[];
  }>;
  compression: {
    eligible: boolean;
    compressed: boolean;
    data_hash: string;
    creator_hash: string;
    asset_hash: string;
    tree: string;
    seq: number;
    leaf_id: number;
  };
  grouping: Array<{
    group_key: string;
    group_value: string;
  }>;
  royalty: {
    royalty_model: string;
    target: null;
    percent: number;
    basis_points: number;
    primary_sale_happened: boolean;
    locked: boolean;
  };
  creators: Array<{
    address: string;
    share: number;
    verified: boolean;
  }>;
  ownership: {
    frozen: boolean;
    delegated: boolean;
    delegate: string;
    ownership_model: string;
    owner: string;
  };
  supply: {
    print_max_supply: number;
    print_current_supply: number;
    edition_nonce: number;
  };
  mutable: boolean;
  burnt: boolean;
  token_info: {
    supply: number;
    decimals: number;
    token_program: string;
    associated_token_address: string;
  };
}

const Home: NextPage = () => {
  const [nfts, setNfts] = useState<NFTResponse[]>([]);
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const nftListings = api.Listing.getAllListings.useQuery();

  return (
    <>
      <Head>
        <title>NFT Sea - Mint Your NFTs</title>
        <meta
          name="description"
          content="Mint your NFTs on Solana blockchain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto mb-5  mt-2 max-w-6xl items-center justify-center rounded-xl border border-neutral-300 bg-white/15 p-8">
            <div className="flex items-center justify-center">
              <div className="flex  gap-2 font-serif">
                <div
                  className="text-4xl font-bold uppercase tracking-wider"
                  style={{
                    background: "linear-gradient(to right, #ffffff, #9e9aa0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Recently
                </div>
                <div
                  className="text-4xl font-bold uppercase tracking-wider"
                  style={{
                    background: "linear-gradient(to left, #ffffff, #9e9aa0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Listed
                </div>
                <div
                  className="text-4xl font-bold uppercase tracking-wider"
                  style={{
                    background: "linear-gradient(to left, #ffffff, #9e9aa0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  NFT&apos;s
                </div>
              </div>
            </div>
            <div className="mx-auto mt-2 max-w-xl px-5 text-center text-sm text-neutral-400">
              These are NFT&apos;s created on NFT Sea
            </div>
          </div>
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {nftListings?.data?.map((nft) => {
                const imageUrl = nft.image_url;
                if (!imageUrl) return null;

                return (
                  <div
                    key={nft.id.toString()}
                    className="rounded-lg bg-white/10 shadow-lg"
                  >
                    <img
                      src={imageUrl}
                      alt="Image not loading"
                      className="mb-4 h-60 w-full rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="p-2">
                      {" "}
                      <h3 className="mb-2 text-xl font-semibold text-white">
                        {nft.title}
                      </h3>
                      <p className="text-gray-400">{nft.description}</p>
                      <a
                        href={`https://xray.helius.xyz/token/${nft.mint_address}?network=mainnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex rounded-sm  "
                      >
                        <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text  text-transparent hover:from-blue-600 hover:to-pink-600">
                          View on Explorer
                        </span>
                        <LuExternalLink
                          className="ml-2  text-pink-600"
                          size={20}
                        />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
