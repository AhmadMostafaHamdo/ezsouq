// src/components/CategoryNav/CategoryNavSkeleton.jsx
import React, { Children } from "react";

const CategorySketlon = ({ isloading, children }) => {
  if (isloading) {
    return (
      <div className="flex items-center mt-3 w-full overflow-x-auto pb-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center mx-4 md:mx-8 relative"
          >
            {/* Image placeholder */}
            <div className="bg-gray-300 rounded-full w-12 h-12 md:w-14 md:h-14 animate-pulse" />

            {/* Title placeholder */}
            <div className="mt-2 h-5 bg-gray-200 rounded w-16 animate-pulse" />

            {/* Selection indicator placeholder */}
            <div className="absolute w-10 h-1 bg-gray-300 rounded-full bottom-[-12px] animate-pulse" />
          </div>
        ))}
      </div>
    );
  }
  return children;
};

export default CategorySketlon;
