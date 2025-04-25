import { useState } from "react";

import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmNzNlZmE4YS04MTQyLTQ1ZWYtYmI4OC1mOTdiZDZhMDUyZmMiLCJlbWFpbCI6InRpYWFuY29kZTFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjA5NGRlZGEzNTEyY2E5MWQxZjUxIiwic2NvcGVkS2V5U2VjcmV0IjoiYzhlYTNhMDdlODlmY2FmOGFlNWU1ODY2Nzc4NGUzY2U4ZDUwYzk5NTQ0YjRkNzMxZjQzZTY3MDA0OTMyZGMyOCIsImV4cCI6MTc3NzA2MTc1MX0.n_ahSlckYI-BEOrgBbps7mpaX2asCjIeszwOygfEVD0",
  pinataGateway: "https://lavender-electric-grasshopper-388.mypinata.cloud",
});

function PinataUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [link, setLink] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploadStatus("Getting upload URL...");

      // Create form data for the file
      const formData = new FormData();
      formData.append("file", file);

      // Upload directly to Pinata
      const upload = await pinata.upload.public.file(file);

      if (upload.cid) {
        setUploadStatus("File uploaded successfully!");
        const ipfsLink = `https://lavender-electric-grasshopper-388.mypinata.cloud/ipfs/${upload.cid}`;
        setLink(ipfsLink);
      } else {
        setUploadStatus("Upload failed");
      }
    } catch (error) {
      setUploadStatus(
        `Error: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  };

  return (
    <>
      <div></div>
      <h1>Vite + React + Pinata</h1>
      <div className="card bg-white">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!file}>
          Upload to Pinata
        </button>
        {uploadStatus && <p>{uploadStatus}</p>}
        {link && (
          <a href={link} target="_blank">
            View File
          </a>
        )}
        <pre>{JSON.stringify(link, null, 2)}</pre>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default PinataUpload;
