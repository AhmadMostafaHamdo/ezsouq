import React, { useRef } from "react";
import { useFormContext } from "react-hook-form";

const VideoUploader = ({ label, name }) => {
  const { setValue, watch } = useFormContext();
  const fileInputRef = useRef(null);
  const videoFile = watch(name);

  const handleVideoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setValue(name, e.target.files[0], { shouldValidate: true });
    }
  };

  return (
    <div className="w-full">
      <div
        onClick={handleVideoClick}
        className="flex-between w-full p-2 rounded-[5px] border border-[#B9B5FF] cursor-pointer"
      >
        <p>{label}</p>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 8M12 8L8 12M12 8L12 16"
            stroke="#B9B5FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {videoFile && <p className="text-xs mt-1 truncate">{videoFile.name}</p>}
      <input
        type="file"
        ref={fileInputRef}
        accept="video/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default VideoUploader;
