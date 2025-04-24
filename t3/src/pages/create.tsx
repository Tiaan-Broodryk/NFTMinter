// imports methods relevant to the react framework
import * as React from "react";
// throws notifications for user friendly error handling
import { toast } from "react-toastify";

import { Upload } from "~/atoms/Upload";
import Image from "next/image";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { api } from "~/utils/api";
import Saved from "~/components/notifications/saved";
// imports icons

const Finished = () => {
  const [apiUrl, setApiUrl] = React.useState<string>("");
  const [nft, setNft] = React.useState<string>("");
  const [nftImage, setNftImage] = React.useState<string>("");
  const [nftConformation, setNftConformation] = useState({
    UnlistedOpen: false,
    open: false,
    incomplete: false,
  });

  // get user info from wallet provider
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [form, setForm] = useState({
    nftName: "",
    description: "",
    image: "",
  });

  const getInitials = (name: string) => {
    const words = name.split(" ");
    if (words.length === 1) {
      return name.substring(0, 3).toUpperCase();
    }
    return words
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const createListing = api.Listing.createNFTListing.useMutation();
  const mintListCompressedNft = async (event: {
    preventDefault: () => void;
  }) => {
    // prevent react app from resetting
    event.preventDefault();

    // make api call to create cNFT
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "linum-labs-nft",
        method: "mintCompressedNft",
        params: {
          name: form.nftName,
          symbol: getInitials(form.nftName).toUpperCase(),
          owner: publicKey,
          description: form.description,
          attributes: [
            {
              trait_type: "Cool Factor",
              value: "Super",
            },
          ],
          imageUrl: form.image,
          externalUrl: "https://tiaancode.com",
          sellerFeeBasisPoints: 5000,
        },
      }),
    });

    const responseData = (await response.json()) as {
      result?: { assetId: string };
    };
    console.log("RESULT", responseData.result);

    if (!responseData.result) {
      toast.error("Request failed");
      throw "Request failed";
    }

    setNft(responseData.result.assetId);

    createListing.mutate({
      title: form.nftName,
      description: form.description,
      imageUrl: form.image,
      price: 0,
      mintAddress: responseData.result.assetId,
      creator: publicKey?.toString() ?? "",
    });

    void fetchNFT(responseData.result.assetId, event);
  };
  const mintCompressedNft = async (event: { preventDefault: () => void }) => {
    // prevent react app from resetting
    event.preventDefault();

    // make api call to create cNFT
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "linum-labs-nft",
        method: "mintCompressedNft",
        params: {
          name: form.nftName,
          symbol: getInitials(form.nftName).toUpperCase(),
          owner: publicKey,
          description: form.description,
          attributes: [
            {
              trait_type: "Cool Factor",
              value: "Super",
            },
          ],
          imageUrl: form.image,
          externalUrl: "https://tiaancode.com",
          sellerFeeBasisPoints: 5000,
        },
      }),
    });

    const responseData = (await response.json()) as {
      result?: { assetId: string };
    };
    console.log("RESULT", responseData.result);

    if (!responseData.result) {
      toast.error("Request failed");
      throw "Request failed";
    }

    setNft(responseData.result.assetId);

    void fetchNFT(responseData.result.assetId, event);
  };
  const [isLoading, setIsLoading] = useState(false);

  // fetch nft after it's minted
  const fetchNFT = async (
    assetId: string,
    event: { preventDefault: () => void },
  ) => {
    // prevent app from reloading
    event.preventDefault();

    // api call to fetch nft
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "applicaiton/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "getAsset",
        params: {
          id: assetId,
        },
      }),
    });
    // extrapolate api response
    const responseData = (await response.json()) as {
      result?: { content: { links: { image: string } } };
    };
    const { result } = responseData;

    if (!result) {
      throw new Error("No result found in response");
    }

    // set nft image in state variable
    setNftImage(result.content.links.image);

    // return api result
    return { result };
  };

  // display function outputs to ui
  const outputs = [
    {
      title: "Asset ID...",
      dependency: nft,
      href: `https://xray.helius.xyz/token/${nft}?network=mainnet`,
    },
  ];

  // set api url onload
  React.useEffect(() => {
    setApiUrl(
      connection.rpcEndpoint.includes("devnet")
        ? "https://mainnet.helius-rpc.com/?api-key=23aabe59-1cbe-4b31-91da-0ae23a590bdc"
        : "https://mainnet.helius-rpc.com/?api-key=23aabe59-1cbe-4b31-91da-0ae23a590bdc",
    );
  }, [connection]);

  return (
    <div>
      {createListing.isSuccess ||
        (outputs[0]?.dependency && (
          <>
            <Saved />
          </>
        ))}
      {!publicKey && (
        <>
          <div className="flex min-h-[60vh] flex-col items-center justify-center">
            <div className="rounded-lg bg-gray-800 p-8 text-center shadow-xl">
              <h2 className="mb-4 text-2xl font-bold text-white">
                Connect Your Wallet
              </h2>
              <p className="mb-6 text-gray-300">
                Please connect your Solana wallet to mint NFTs
              </p>
            </div>
          </div>
        </>
      )}
      {nftConformation.open && !outputs[0]?.dependency && (
        <>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setNftConformation({ ...nftConformation, open: false });
              }
            }}
          >
            <div
              className="mx-auto max-w-2xl rounded-lg border-l border-white/30 bg-black p-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="">
                <div className="rounded-lg">
                  {form.image && (
                    <Image
                      src={form.image}
                      alt="NFT Preview"
                      width={300}
                      height={300}
                      className="mx-auto rounded-lg"
                    />
                  )}
                </div>
                <div className="py-3">
                  <p className="font-serif text-lg font-bold text-gray-300">
                    {form.nftName}
                  </p>
                  <p className="text-sm text-neutral-400 ">
                    {form.description}
                  </p>
                </div>

                <div className="">
                  <button
                    onClick={(event) => mintListCompressedNft(event)}
                    className={`mx-auto flex w-1/3 justify-center rounded-sm border border-transparent bg-gradient-to-r from-blue-500 to-pink-500 px-4 py-3 text-xs font-semibold  text-white shadow-sm hover:from-blue-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}{" "}
      {nftConformation.UnlistedOpen && !outputs[0]?.dependency && (
        <>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setNftConformation({ ...nftConformation, UnlistedOpen: false });
              }
            }}
          >
            <div
              className="mx-auto max-w-2xl rounded-lg border-l border-white/30 bg-black p-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="">
                <div className="rounded-lg">
                  {form.image && (
                    <Image
                      src={form.image}
                      alt="NFT Preview"
                      width={300}
                      height={300}
                      className="mx-auto rounded-lg"
                    />
                  )}
                </div>
                <div className="py-3">
                  <p className="font-serif text-lg font-bold text-gray-300">
                    {form.nftName}
                  </p>
                  <p className="text-sm text-neutral-400 ">
                    {form.description}
                  </p>
                </div>

                <div className="">
                  <button
                    onClick={(event) => mintCompressedNft(event)}
                    className={`mx-auto flex w-1/3 justify-center rounded-sm border border-transparent bg-gradient-to-r from-blue-500 to-pink-500 px-4 py-3 text-xs font-semibold  text-white shadow-sm hover:from-blue-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {publicKey && (
        <>
          {" "}
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
                  Mint
                </div>
                <div
                  className="text-4xl font-bold uppercase tracking-wider"
                  style={{
                    background: "linear-gradient(to left, #ffffff, #9e9aa0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  New
                </div>
                <div
                  className="text-4xl font-bold uppercase tracking-wider"
                  style={{
                    background: "linear-gradient(to right, #ffffff, #9e9aa0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  NFT
                </div>
              </div>
            </div>
            <div className="mx-auto mt-2 max-w-xl px-5 text-center text-sm text-neutral-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed sem
              tortor quis amet scelerisque vivamus egestas.
            </div>
          </div>
          <div className="mx-auto max-w-2xl rounded-lg  p-6">
            {!outputs[0]?.dependency && (
              <>
                <div className="space-y-6">
                  {form.image !== "" && (
                    <>
                      <Image
                        src={form.image}
                        alt={"Image Not Loading"}
                        height={100}
                        width={100}
                        className="mx-auto h-auto w-1/2  rounded-md "
                      />
                    </>
                  )}
                  <Upload
                    onUpload={async (data) => {
                      console.log("uploaded");
                      console.log(data);
                      const first = data[0];

                      if (!first) return;

                      console.log(first);

                      const res = data.map((d) => {
                        setForm({
                          ...form,
                          image: d.url,
                        });
                      });
                    }}
                  />

                  <div>
                    {/* <label className="block text-sm font-medium text-gray-300">
                  NFT Title
                </label> */}
                    <input
                      type="text"
                      placeholder="NFT Title"
                      value={form.nftName}
                      onChange={(e) =>
                        setForm({ ...form, nftName: e.target.value })
                      }
                      className="mt-1 block w-full rounded border border-neutral-400 bg-neutral-600 p-3 text-white placeholder:text-neutral-200 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    {/* <label className="block text-sm font-medium text-gray-300">
                  Description
                </label> */}
                    <textarea
                      rows={4}
                      value={form.description}
                      placeholder="Description"
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      className="mt-1 block w-full rounded border border-neutral-400 bg-neutral-600 p-3 text-white placeholder:text-neutral-200 focus:outline-none"
                      required
                    />
                  </div>
                  {nftConformation.incomplete &&
                    (form.image === "" ||
                      form.nftName === "" ||
                      form.description === "") && (
                      <>
                        <p className="text-red-500">
                          Please complete all fields
                        </p>
                      </>
                    )}
                  <div className="grid grid-cols-2 gap-4">
                    {" "}
                    {(form.image === "" ||
                      form.nftName === "" ||
                      form.description === "") && (
                      <>
                        <button
                          onClick={() =>
                            setNftConformation({
                              ...nftConformation,
                              incomplete: true,
                            })
                          }
                          className={`flex w-full justify-center rounded-sm  px-4  py-4 text-sm font-bold text-white hover:bg-white/10 focus:ring-offset-2`}
                        >
                          Mint without listing
                        </button>
                      </>
                    )}
                    {form.image !== "" &&
                      form.nftName !== "" &&
                      form.description !== "" && (
                        <>
                          <button
                            onClick={() =>
                              setNftConformation({
                                ...nftConformation,
                                UnlistedOpen: true,
                              })
                            }
                            className={`flex w-full justify-center rounded-sm  px-4  py-4 text-sm font-bold text-white hover:bg-white/10 focus:ring-offset-2`}
                          >
                            Mint without listing
                          </button>
                        </>
                      )}{" "}
                    {(form.image === "" ||
                      form.nftName === "" ||
                      form.description === "") && (
                      <>
                        <button
                          onClick={() =>
                            setNftConformation({
                              ...nftConformation,
                              incomplete: true,
                            })
                          }
                          className={`flex w-full justify-center rounded-sm  bg-gradient-to-r from-blue-500 to-pink-500 px-4 py-4 text-sm font-bold text-white shadow-sm hover:from-blue-600 hover:to-pink-600 focus:outline-none focus:ring-2 `}
                        >
                          Mint and list immediately
                        </button>
                      </>
                    )}
                    {form.image !== "" &&
                      form.nftName !== "" &&
                      form.description !== "" && (
                        <>
                          <button
                            onClick={() =>
                              setNftConformation({
                                ...nftConformation,
                                open: true,
                              })
                            }
                            className={`flex w-full justify-center rounded-sm   bg-gradient-to-r from-blue-500 to-pink-500 px-4 py-4 text-sm font-bold text-white shadow-sm hover:from-blue-600 hover:to-pink-600 focus:outline-none focus:ring-2 `}
                          >
                            Mint and list immediately
                          </button>
                        </>
                      )}
                  </div>
                </div>
              </>
            )}
          </div>
          {outputs[0]?.dependency && (
            <>
              <main className=" text-white ">
                <div className="min-h-content mx-auto max-w-5xl rounded-lg  p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold sm:text-2xl">
                      NFT Creation Confirmation 🎉
                    </h2>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-lg border-2 border-gray-500 bg-white/10 p-4">
                      <div className="flex h-[300px] items-center justify-center rounded-md">
                        {form.image ? (
                          <Image
                            src={form.image}
                            width={300}
                            height={300}
                            alt="NFT Preview"
                            className="h-full w-full rounded-md object-contain"
                          />
                        ) : (
                          <p className="text-gray-500">No image available</p>
                        )}
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="rounded-lg border-2 border-gray-500 bg-white/10 p-4">
                      <h3 className="mb-4 text-lg font-semibold">
                        NFT Details
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-400">Name</p>
                          <p className="text-lg font-medium text-white">
                            {form.nftName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Description</p>
                          <p className="text-lg font-medium text-white">
                            {form.description}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Owner</p>
                          <p className="text-lg font-medium text-white">
                            <a
                              href={`https://solscan.io/account/${publicKey?.toString()}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#80ebff] hover:text-white"
                            >
                              {publicKey?.toString().slice(0, 10)}...
                            </a>
                          </p>
                        </div>
                        {outputs[0]?.href && (
                          <div>
                            <p className="text-sm text-gray-400">
                              View on Helius
                            </p>
                            <a
                              href={outputs[0].href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-lg font-medium text-[#80ebff] hover:text-white"
                            >
                              View NFT
                              <FaExternalLinkSquareAlt className="ml-2 w-5" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* <pre>{JSON.stringify(outputs[0], null, 2)}</pre> */}
                  </div>
                </div>
              </main>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Finished;
