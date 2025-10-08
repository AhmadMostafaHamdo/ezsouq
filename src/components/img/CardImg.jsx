import { useState } from "react";

const CardImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full h-32 bg-gray-100 rounded-md overflow-hidden">
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default CardImage;
