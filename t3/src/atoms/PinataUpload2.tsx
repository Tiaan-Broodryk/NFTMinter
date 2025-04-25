import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmNzNlZmE4YS04MTQyLTQ1ZWYtYmI4OC1mOTdiZDZhMDUyZmMiLCJlbWFpbCI6InRpYWFuY29kZTFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjA5NGRlZGEzNTEyY2E5MWQxZjUxIiwic2NvcGVkS2V5U2VjcmV0IjoiYzhlYTNhMDdlODlmY2FmOGFlNWU1ODY2Nzc4NGUzY2U4ZDUwYzk5NTQ0YjRkNzMxZjQzZTY3MDA0OTMyZGMyOCIsImV4cCI6MTc3NzA2MTc1MX0.n_ahSlckYI-BEOrgBbps7mpaX2asCjIeszwOygfEVD0",
  pinataGateway: "https://lavender-electric-grasshopper-388.mypinata.cloud",
});

import { useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { cn } from "~/utils/cn";

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
