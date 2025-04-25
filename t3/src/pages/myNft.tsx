import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { LuExternalLink, LuX } from "react-icons/lu";
import NFTTile from "~/components/NFTTile";

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

const MyNfts: NextPage = () => {
  const [nfts, setNfts] = useState<NFTResponse[]>([]);
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  useEffect(() => {
    const fetchRecentNFTs = async () => {
      if (!publicKey) {
        console.error("User is not signed in or no wallet connected.");
        return;
      }
      if (publicKey) {
        try {
          const response = await fetch(
            "https://mainnet.helius-rpc.com/?api-key=23aabe59-1cbe-4b31-91da-0ae23a590bdc",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                jsonrpc: "2.0",
                id: "my-id",
                method: "getAssetsByOwner",
                params: {
                  ownerAddress: publicKey.toString(),
                  page: 1,
                  limit: 10,
                  sortBy: {
                    sortBy: "created",
                    sortDirection: "desc",
                  },
                },
              }),
            },
          );
          const data = (await response.json()) as {
            result: { items: NFTResponse[] };
          };
          if (data?.result?.items) {
            setNfts(data.result.items);
          }
        } catch (error) {
          console.error("Error fetching NFTs:", error);
        }
      }
    };

    void fetchRecentNFTs();
  }, [publicKey]);

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
                My
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
            These are the Your NFT&apos;s
          </div>
        </div>

        <div className="container mx-auto max-w-6xl pt-5">
          <div className="space-y-8">
            {/* <pre>{JSON.stringify(nfts, null, 2)}</pre> */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {nfts.map((nft) => {
                const imageUrl = nft.content?.files[0]?.uri;
                if (!imageUrl) return null;

                return (
                  <>
                    <NFTTile
                      key={nft.id.toString()}
                      nft={{
                        id: nft.id.toString(),
                        title: nft.content?.metadata?.name,
                        description: nft.content?.metadata?.description,
                        mint_address: nft.id,
                      }}
                      imageUrl={imageUrl}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MyNfts;
