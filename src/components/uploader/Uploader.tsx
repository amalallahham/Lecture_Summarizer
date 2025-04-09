// import React, {
//   useState,
//   ChangeEvent,
//   DragEvent,
//   FormEvent,
//   useRef,
//   useEffect,
// } from "react";
// import "../assets/styles/uploader.css";

// import thinking from "../assets/images/thinking.png";
// import { HashLoader } from "react-spinners";
// type FileType = "video" | "audio" | null;

// const Uploader: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [fileType, setFileType] = useState<FileType>(null);
//   const [dragActive, setDragActive] = useState<boolean>(false);
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const [step, setStep] = useState<"uploading" | "summarizing">("uploading");

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setStep("summarizing");
//     }, 60000);

//     return () => clearTimeout(timer);
//   }, []);
//   const handleFile = (selectedFile: File) => {
//     if (!selectedFile) return;
//     setFile(selectedFile);
//     setPreviewUrl(URL.createObjectURL(selectedFile));
//     setFileType(selectedFile.type.startsWith("video") ? "video" : "audio");
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile) handleFile(selectedFile);
//   };

//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setDragActive(true);
//   };

//   const handleDragLeave = () => {
//     setDragActive(false);
//   };

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setDragActive(false);
//     const droppedFile = e.dataTransfer.files?.[0];
//     if (droppedFile) handleFile(droppedFile);
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!file) return;
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("http://localhost:8000/api/upload", {
//         method: "POST",
//         body: formData,
//       });
//       if (!response.ok) throw new Error("Upload failed");

//       const data = await response.json();
//       console.log("Upload success:", data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Upload error:", error);
//       alert("File upload failed.");
//     }
//   };

//   const openFileDialog = () => {
//     inputRef.current?.click();
//   };

//   return (
//     <div className="container">
//       <form onSubmit={handleSubmit} className="py-2 px-5 position-relative">
//         {!loading ? (
//           <div
//             className={`dashed d-flex flex-column justify-content-center align-items-center drop-zone p-5 text-center ${
//               dragActive ? "drag-active" : ""
//             }`}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onDrop={handleDrop}
//           >
//             {!file && (
//               <>
//                 {" "}
//                 <div>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="90"
//                     height="90"
//                     fill="currentColor"
//                     className="bi bi-cloud-arrow-up-fill icon-color mb-3"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z" />
//                   </svg>
//                 </div>
//                 <h4 className="extraBold">Drag & drop a .mp4 or .mp3 file</h4>
//                 <p className="text-muted">or</p>
//               </>
//             )}

//             {file && (
//               <div className="mt-4">
//                 <strong>Selected file:</strong> {file.name}
//               </div>
//             )}

//             {previewUrl && fileType === "video" && (
//               <div className="mt-3">
//                 <video key={previewUrl} controls width="100%">
//                   <source src={previewUrl} type={file?.type} />
//                   Your browser does not support the video tag.
//                 </video>
//               </div>
//             )}

//             {previewUrl && fileType === "audio" && (
//               <div className="mt-3">
//                 <audio key={previewUrl} controls>
//                   <source src={previewUrl} type={file?.type} />
//                   Your browser does not support the audio tag.
//                 </audio>
//               </div>
//             )}

//             <button
//               type="button"
//               className="btn choose-file-btn py-2 px-3 m-3 bold min-width "
//               onClick={openFileDialog}
//             >
//               {!file ? "Select Video" : "Select Another Video"}
//             </button>
//             <input
//               type="file"
//               accept="video/*,audio/*"
//               className="d-none"
//               ref={inputRef}
//               onChange={handleFileChange}
//             />

//             {file && (
//               <div className="text-center mt-3">
//                 <button
//                   type="submit"
//                   className="btn primary-button min-width extraBold"
//                   disabled={!file}
//                 >
//                   Upload
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="dashed center-abs">
//             <div className="center-abs">
//               <p className=" text-center font-size-20px gradient-text extraBold p-3">
//                 {step === "uploading"
//                   ? "Uploading your file. Please wait — this might take a little while depending on its size."
//                   : "We are creating your summary. Hang tight!"}
//               </p>
//               <HashLoader color="#ff930f" size={100} />
//             </div>
//           </div>
//         )}
//         <div className="img-abs-fr">
//           <img src={thinking} width={260} height={260} />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Uploader;

import React, {
  ChangeEvent,
  DragEvent,
  RefObject,
  useState,
} from "react";

type Props = {
  file: File | null;
  fileType: "video" | "audio" | null;
  previewUrl: string | null;
  inputRef: RefObject<HTMLInputElement | null> ;
  onFileSelect: (file: File) => void;
  onOpenFileDialog: () => void;
};

const FileUploader: React.FC<Props> = ({
  file,
  fileType,
  previewUrl,
  inputRef,
  onFileSelect,
  onOpenFileDialog,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) onFileSelect(selectedFile);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) onFileSelect(droppedFile);
  };

  return (
    <div
      className={`dashed d-flex flex-column justify-content-center align-items-center drop-zone p-3 text-center ${
        dragActive ? "drag-active" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
       {!file && (
              <>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="90"
                    height="90"
                    fill="currentColor"
                    className="bi bi-cloud-arrow-up-fill icon-color mb-3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z" />
                  </svg>
                </div>
                <h4 className="extraBold">Drag & drop a .mp4 or .mp3 file</h4>
                <p className="text-muted">or</p>
              </>
            )}

      {file && (
        <div className="mt-4">
          <strong>Selected file:</strong> {file.name}
        </div>
      )}

      {previewUrl && fileType === "video" && (
        <div className="mt-3">
          <video key={previewUrl} controls width="100%">
            <source src={previewUrl} />
          </video>
        </div>
      )}

      {previewUrl && fileType === "audio" && (
        <div className="mt-3">
          <audio key={previewUrl} controls>
            <source src={previewUrl} />
          </audio>
        </div>
      )}

      <button
        type="button"
        className="btn choose-file-btn py-2 px-3 m-3 bold min-width"
        onClick={onOpenFileDialog}
      >
        {!file ? "Select Video" : "Select Another Video"}
      </button>
      <input
        type="file"
        accept="video/*,audio/*"
        className="d-none"
        ref={inputRef}
        onChange={handleFileChange}
      />

      {file && (
        <button
          type="submit"
          className="btn primary-button min-width extraBold mt-3"
        >
          Upload
        </button>
      )}
    </div>
  );
};

export default FileUploader;
