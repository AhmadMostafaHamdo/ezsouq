import { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";

const ThumbnailImage = ({ src, isSelected, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className="relative">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner className="w-8 h-8" />
        </div>
      )}
      <img
        ref={imgRef}
        src={`https://ezsouq.store/uploads/images/${src}`}
        alt={`Thumbnail`}
        className={`w-20 h-16 object-cover cursor-pointer rounded-[6px] border-2 ${
          isSelected
            ? "border-[#6C63FF] shadow-[0px_4px_12px_6px_rgba(63,61,86,0.3)]"
            : "border-[#D9D9D9]"
        } ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onClick={onClick}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};
export default ThumbnailImage;
