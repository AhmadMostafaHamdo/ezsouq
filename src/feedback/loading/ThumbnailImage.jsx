import { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";

// ThumbnailImage component displays a small preview image with loading state
const ThumbnailImage = ({ src, isSelected, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  // Check if image is already loaded (cached)
  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className="relative">
      {/* Spinner while image is loading */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {/* Thumbnail image */}
      <img
        ref={imgRef}
        src={`https://api.ezsouq.store/uploads/images/${src}`}
        alt={`صورة مصغرة للمنتج`} // Arabic alt for SEO
        className={`w-20 h-16 object-cover cursor-pointer rounded-[6px] border-2 transition-opacity duration-300 ${
          isSelected
            ? "border-[#6C63FF] shadow-[0px_4px_12px_6px_rgba(63,61,86,0.3)]"
            : "border-[#D9D9D9]"
        } ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onClick={onClick}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        loading="lazy" // Lazy loading for SEO and performance
      />
    </div>
  );
};

export default ThumbnailImage;
