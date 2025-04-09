import React, { useState, useEffect, useRef, FormEvent } from "react";

import Summery from "./Summery";
// import Uploader from "./Uploader";
import UploaderLoader from "./UploaderLoader";
import FileUploader from "./Uploader";
import thinking from "../../assets/images/thinking.png";

import "../../assets/styles/uploader.css";

type FileType = "video" | "audio" | null;

const UploaderWrapper: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<FileType>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [step, setStep] = useState<"uploading" | "summarizing">("uploading");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setStep("summarizing");
      }, 60000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleFile = (selectedFile: File) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setFileType(selectedFile.type.startsWith("video") ? "video" : "audio");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      console.log("Upload success:", data);
      setLoading(false);
      setData(data);
    } catch (error) {
      console.error("Upload error:", error);
      alert("File upload failed.");
    }
  };

  return (
    <div className="container mb-5">
      <form onSubmit={handleSubmit} className="py-2 px-5 position-relative">
        {!loading && !data ? (
          <FileUploader
            file={file}
            fileType={fileType}
            previewUrl={previewUrl}
            inputRef={inputRef}
            onFileSelect={handleFile}
            onOpenFileDialog={() => inputRef.current?.click()}
          />
        ) : loading && !data ? (
          <UploaderLoader step={step} />
        ) : (
          <Summery data={data} />
        )}

        {/* Replace this with UploadResult when you're ready */}

        <div className="img-abs-fr">
          <img src={thinking} width={260} height={260} />
        </div>
      </form>
    </div>
  );
};

export default UploaderWrapper;
