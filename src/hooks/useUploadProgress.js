import { useState, useCallback } from 'react';

/**
 * Custom hook for tracking upload progress
 * @returns {Object} Object containing progress state and handlers
 */
export const useUploadProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const startUpload = useCallback(() => {
    setIsUploading(true);
    setProgress(0);
    setError(null);
  }, []);

  const updateProgress = useCallback((newProgress) => {
    setProgress(Math.min(100, Math.max(0, newProgress)));
  }, []);

  const completeUpload = useCallback(() => {
    setProgress(100);
    setIsUploading(false);
    setError(null);
  }, []);

  const failUpload = useCallback((errorMessage) => {
    setIsUploading(false);
    setError(errorMessage);
  }, []);

  const resetUpload = useCallback(() => {
    setProgress(0);
    setIsUploading(false);
    setError(null);
  }, []);

  return {
    progress,
    isUploading,
    error,
    startUpload,
    updateProgress,
    completeUpload,
    failUpload,
    resetUpload,
  };
};

export default useUploadProgress;
