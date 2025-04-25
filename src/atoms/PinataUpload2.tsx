import { PinataSDK } from "pinata";
import { useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { env } from "~/env";
import { cn } from "~/utils/cn";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT ?? "",
  pinataGateway: "https://lavender-electric-grasshopper-388.mypinata.cloud",
});

export interface PutBlobResult {
  url: string;
}

export function PinataUpload2(props: {
  onUpload?: (result: PutBlobResult[]) => Promise<void>;
  multiple?: boolean;
}) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [dragover, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [link, setLink] = useState("");

  const handleFiles = async (files: FileList) => {
    const results: PutBlobResult[] = [];
    setBusy(true);

    for (const file of files) {
      try {
        setUploadStatus("Getting upload URL...");
        const upload = await pinata.upload.public.file(file);

        if (upload.cid) {
          setUploadStatus("File uploaded successfully!");
          const ipfsLink = `https://lavender-electric-grasshopper-388.mypinata.cloud/ipfs/${upload.cid}`;
          setLink(ipfsLink);
          results.push({ url: ipfsLink });
        } else {
          setUploadStatus("Upload failed");
        }
      } catch (error) {
        setUploadStatus(
          `Error: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }

    setBusy(false);
    if (props.onUpload) {
      await props.onUpload(results);
    }
  };

  return (
    <div>
      <button
        className={cn(
          "flex w-full flex-1 flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-neutral-400 bg-neutral-600 p-5 text-center align-middle text-xs text-white transition hover:bg-neutral-700 hover:text-neutral-400 [&>*]:border-spacing-8",
          dragover && "bg-neutral-700 hover:bg-neutral-700",
          busy && "animate-pulse bg-neutral-700 hover:bg-neutral-700",
        )}
        onClick={() => {
          if (hiddenFileInput.current) hiddenFileInput.current.click();
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragOver(true);
        }}
        onDragOver={(e) => {
          setDragOver(true);
          e.dataTransfer.dropEffect = "copy";
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragLeave={(e) => {
          setDragOver(false);
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          setDragOver(false);
          e.preventDefault();
          e.stopPropagation();
          const { files } = e.dataTransfer;
          handleFiles(files).catch(console.error);
        }}
      >
        <div className="flex gap-2 font-serif text-base">
          <BsUpload size={20} />
          Upload Image
        </div>
        <input
          type="file"
          onChange={(e) => {
            if (!e.target?.files) return;
            handleFiles(e.target.files).catch(console.error);
          }}
          ref={hiddenFileInput}
          multiple={props.multiple}
          style={{ display: "none" }}
        />
        <span className="whitespace-pre-wrap text-neutral-400">
          {busy ? "Uploading... Please wait." : "format supported"}
        </span>
      </button>

      {/* {uploadStatus && (
        <p className="mt-2 text-center text-sm text-neutral-400">
          {uploadStatus}
        </p>
      )}
      {link && (
        <div className="mt-2 text-center">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:underline"
          >
            View File
          </a>
        </div>
      )} */}
    </div>
  );
}

export default PinataUpload2;
