import React from "react";
import { HashLoader } from "react-spinners";

type Props = {
  step: "uploading" | "summarizing";
};

const UploadLoader: React.FC<Props> = ({ step }) => {
  return (
    <div className="dashed center-abs text-center">
      <p className="font-size-20px gradient-text extraBold p-3">
        {step === "uploading"
          ? "Uploading your file. Please wait — this might take a little while depending on its size."
          : "We are creating your summary. Hang tight!"}
      </p>
      <HashLoader color="#ff930f" size={100} />
    </div>
  );
};

export default UploadLoader;
