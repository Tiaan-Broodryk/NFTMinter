import { useState } from "react";
import { LuChevronDown, LuExternalLink, LuX } from "react-icons/lu";

interface NFTTileProps {
  nft: {
    id: string;
    title: string;
    description: string;
    mint_address: string;
  };
  imageUrl: string;
}

export default function NFTTile({ nft, imageUrl }: NFTTileProps) {
  const [selectedNft, setSelectedNft] = useState<NFTTileProps["nft"] | null>(
    null,
  );

  return (
    <div>
      <div
        key={nft.id.toString()}
        className="flex h-[400px] cursor-pointer flex-col rounded-lg bg-white/10 shadow-lg"
        onClick={() => setSelectedNft(nft)}
      >
        <img
          src={imageUrl}
          alt="Image not loading"
          className="h-60 w-full rounded-lg object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="flex flex-1 flex-col p-4">
          <h3 className="mb-2 line-clamp-2 text-xl font-semibold text-white">
            {nft.title}
          </h3>
          <p className="line-clamp-3 flex-1 text-gray-400">{nft.description}</p>
          <a
            href={`https://xray.helius.xyz/token/${nft.mint_address}?network=mainnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex rounded-sm"
          >
            <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent hover:from-blue-600 hover:to-pink-600">
              View on Explorer
            </span>
            <LuExternalLink className="ml-2 text-pink-600" size={20} />
          </a>
        </div>
      </div>

      {selectedNft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl rounded-lg border-l border-white/30 bg-black p-3 pb-20">
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedNft(null)}
                className="text-white hover:text-gray-300"
              >
                <LuX size={24} />
              </button>
            </div>
            <div className=" grid grid-cols-1 gap-6 px-8 md:grid-cols-5">
              <div className="col-span-2 ">
                <img
                  src={imageUrl}
                  alt="NFT"
                  className="h-[320px] rounded object-cover"
                />
                <div className="mt-4">
                  <details className="rounded border border-white/50 bg-white/30 p-4">
                    <summary className="flex cursor-pointer justify-between text-white">
                      Details
                      <LuChevronDown className="h-5 w-5" />
                    </summary>
                    <div className="mt-2 space-y-2">
                      <a
                        href={`https://xray.helius.xyz/token/${nft.mint_address}?network=mainnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-sm bg-gradient-to-r from-blue-500 to-pink-500 px-4 py-2 text-white hover:from-blue-600 hover:to-pink-600"
                      >
                        View on Explorer
                        <LuExternalLink className="ml-2" size={20} />
                      </a>
                    </div>
                  </details>
                </div>
              </div>
              <div className="col-span-3">
                <h2 className="font-serif text-2xl font-bold text-white">
                  {nft.title}
                </h2>
                <div className="mt-4 font-sans font-medium tracking-wide text-white">
                  DESCRIPTION
                </div>
                <p className="mt-1 border-b border-neutral-500 pb-4 text-sm text-neutral-400">
                  {nft.description}
                </p>

                <div className="mt-4"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
