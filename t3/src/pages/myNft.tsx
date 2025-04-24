import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { LuExternalLink, LuX } from "react-icons/lu";

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

  const [selectedNft, setSelectedNft] = useState<NFTResponse | null>(null);

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
        <pre>{JSON.stringify(selectedNft, null, 2)}</pre>
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* <pre>{JSON.stringify(nfts, null, 2)}</pre> */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {nfts.map((nft) => {
                const imageUrl = nft.content?.files[0]?.uri;
                if (!imageUrl) return null;

                return (
                  <>
                    <div
                      key={nft.id}
                      className="cursor-pointer rounded-lg bg-white/10 shadow-lg"
                      onClick={() => setSelectedNft(nft)}
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
                        <h3 className="mb-2 text-xl font-semibold text-white">
                          {nft.content?.metadata?.name}
                        </h3>
                        <p className="text-gray-400">
                          {nft.content?.metadata?.description}
                        </p>
                        <a
                          href={`https://xray.helius.xyz/token/${nft.id}?network=mainnet`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 flex rounded-sm"
                        >
                          <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent hover:from-blue-600 hover:to-pink-600">
                            View on Explorer
                          </span>
                          <LuExternalLink
                            className="ml-2 text-pink-600"
                            size={20}
                          />
                        </a>
                      </div>
                    </div>

                    {selectedNft && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <div className="mx-auto max-w-2xl rounded-lg border-l border-white/30 bg-black p-6">
                          <div className="flex justify-end">
                            <button
                              onClick={() => setSelectedNft(null)}
                              className="text-white hover:text-gray-300"
                            >
                              <LuX size={24} />
                            </button>
                          </div>
                          <div className="mt-4">
                            <img
                              src={selectedNft.content?.files[0]?.uri}
                              alt="NFT"
                              className="mx-auto h-64 w-64 rounded-lg object-cover"
                            />
                            <div className="mt-4 space-y-4">
                              <h2 className="text-2xl font-bold text-white">
                                {selectedNft.content?.metadata?.name}
                              </h2>
                              <p className="text-gray-300">
                                {selectedNft.content?.metadata?.description}
                              </p>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-400">
                                    Mint Address
                                  </p>
                                  <p className="text-white">{selectedNft.id}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-400">Owner</p>
                                  <p className="text-white">
                                    {selectedNft.ownership?.owner}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-4">
                                <a
                                  href={`https://xray.helius.xyz/token/${selectedNft.id}?network=mainnet`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center rounded-sm bg-gradient-to-r from-blue-500 to-pink-500 px-4 py-2 text-white hover:from-blue-600 hover:to-pink-600"
                                >
                                  View on Explorer
                                  <LuExternalLink className="ml-2" size={20} />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
