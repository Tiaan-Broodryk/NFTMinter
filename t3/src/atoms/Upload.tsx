import { useRef, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { cn } from "~/utils/cn";

export interface PutBlobResult {
  // url: string;
  // downloadUrl: string;
  // pathname: string;
  // contentType: string;
  // contentDisposition: string;
  url: string;
}

type UploadOptions = {
  access: "public" | "private";
  handleUploadUrl?: string;
};

/**
 * Uploads a blob into your store from the client.
 * Detailed documentation can be found here: https://vercel.com/docs/storage/vercel-blob/using-blob-sdk#client-uploads
 *
 * If you want to upload from your server instead, check out the documentation for the put operation: https://vercel.com/docs/storage/vercel-blob/using-blob-sdk#upload-a-blob
 *
 * @param pathname - The pathname to upload the blob to. This includes the filename.
 * @param body - The contents of your blob. This has to be a supported fetch body type https://developer.mozilla.org/en-US/docs/Web/API/fetch#body.
 * @param options - Additional options.
 */
async function upload(
  pathname: string,
  file: File,
  optionsInput?: UploadOptions | undefined,
): Promise<PutBlobResult> {
  const formData = new FormData();
  formData.append("file", file);

  const res = (await fetch("/api/upload", {
    method: "POST",
    body: formData,
  }).then((res) => res.json())) as { message: string; status: number };

  // alert(JSON.stringify(`${res.message}, status: ${res.status}`));
  // console.log(res);

  const result: PutBlobResult = {
    // url: "",
    // downloadUrl: "",
    // pathname: "",
    // contentType: "",
    // contentDisposition: "",
    url: res.message,
  };
  return result;
}

export function Upload(props: {
  title?: string;
  /** ex: "/api/upload/logo" */
  handleUploadUrl?: string;
  // onUpload?: (url: string) => Promise<void>;
  onUpload?: (result: PutBlobResult[]) => Promise<void>;
  multiple?: boolean;
}) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [dragover, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);

  const [state, setState] = useState<{ uploaded: PutBlobResult[] }>({
    uploaded: [],
  });

  async function handleFiles(files: FileList) {
    // console.log("Upload files:", files);

    const results: PutBlobResult[] = [];

    setBusy(true);
    for (const file of files) {
      const newBlob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: props.handleUploadUrl ?? "/api/upload/image",
      });

      results.push(newBlob);
    }
    setBusy(false);

    if (props.onUpload) {
      await props.onUpload(results);
    }

    setState({ uploaded: results });
  }

  return (
    <div>
      <button
        className={cn(
          "flex w-full flex-1 flex-col items-center justify-center gap-2 rounded border-2 border-dashed border-green-500 bg-green-500/30 p-5 text-center align-middle text-xs text-white transition hover:bg-green-500/60",
          dragover && "bg-green-500 hover:bg-green-500",
          busy && "animate-pulse bg-green-500 hover:bg-green-500",
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
        <FaArrowCircleUp size={26} />

        <input
          type="file"
          onChange={(e) => {
            if (!e.target?.files) return;
            // const fileUploaded = e.target.files[0];
            // if (!fileUploaded) return;
            handleFiles(e.target.files).catch(console.error);
          }}
          ref={hiddenFileInput}
          multiple={props.multiple}
          style={{ display: "none" }} // Make the file input element invisible
        />
        <span className="whitespace-pre-wrap text-neutral-800">
          {busy
            ? "Uploading... Please wait."
            : "Click or Drag and drop image's to upload"}
        </span>
      </button>
    </div>
  );
}
