import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useUploadProgress } from "../../hooks/useUploadProgress";

const VideoUploader = ({ label, name, error }) => {
  const { setValue, watch, setError, clearErrors } = useFormContext();
  const fileInputRef = useRef(null);
  const videoFile = watch(name);
  const [isDragOver, setIsDragOver] = useState(false);
  const { progress, isUploading, startUpload, updateProgress, completeUpload, failUpload } = useUploadProgress();

  // Trigger file input when the container is clicked
  const handleVideoClick = () => {
    fileInputRef.current?.click();
  };

  // Validate video file
  const validateVideoFile = (file) => {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv'];
    
    if (!allowedTypes.includes(file.type)) {
      return 'نوع الفيديو غير مدعوم. يرجى اختيار MP4, AVI, MOV, WMV, أو FLV';
    }
    
    if (file.size > maxSize) {
      return 'حجم الفيديو كبير جداً. الحد الأقصى 50 ميغابايت';
    }
    
    return null;
  };

  // Update form value when a video is selected
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validationError = validateVideoFile(file);
      if (validationError) {
        setError(name, { message: validationError });
        failUpload(validationError);
        return;
      }
      
      clearErrors(name);
      startUpload();
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          completeUpload();
        }
        updateProgress(progress);
      }, 200);
      
      setValue(name, file, { shouldValidate: true });
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      const event = { target: { files: [file] } };
      handleFileChange(event);
    }
  };

  // Remove video
  const removeVideo = () => {
    setValue(name, undefined, { shouldValidate: true });
    clearErrors(name);
  };

  return (
    <div className="w-full">
      {/* Upload Area */}
      <div
        onClick={handleVideoClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex-between w-full p-4 rounded-[8px] border-2 border-dashed cursor-pointer transition-all duration-200 ${
          isDragOver
            ? 'border-primary bg-secondary/20'
            : videoFile
            ? 'border-green-400 bg-green-50'
            : 'border-[#B9B5FF] hover:border-primary hover:bg-[#f9f9ff]'
        }`}
      >
        <div className="flex items-center gap-3">
          {videoFile ? (
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM15 9a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-700">{videoFile.name}</p>
                <p className="text-xs text-gray-500">{(videoFile.size / (1024 * 1024)).toFixed(1)} ميغابايت</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-[#B9B5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-[#B9B5FF]">{label}</p>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {videoFile && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeVideo();
              }}
              className="p-1 text-red-500 hover:bg-red-50 rounded transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#B9B5FF]"
          >
            <path
              d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 8M12 8L8 12M12 8L12 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>جارٍ الرفع...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error.message}
        </p>
      )}

      {/* File Info */}
      {!videoFile && (
        <p className="text-xs text-gray-500 mt-2">
          يمكنك سحب وإفلات الفيديو هنا أو النقر للاختيار • الحد الأقصى: 50 ميغابايت
        </p>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/avi,video/mov,video/wmv,video/flv"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default VideoUploader;
