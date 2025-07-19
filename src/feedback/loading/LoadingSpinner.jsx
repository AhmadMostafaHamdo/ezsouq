import React from "react";

const LoadingSpinner = ({ loading, children, w, h }) => {
  if (loading) {
    return (
      <div className={`flex-center h-${h} w-${w} bg-[#0000002f]`}>
        <div className="text-white text-3xl">جارٍ التحميل ...</div>
      </div>
    );
  }
  return children;
};

export default LoadingSpinner;
