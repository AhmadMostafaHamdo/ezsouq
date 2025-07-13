const ImageLoader = ({ src }) => {
  return (
    <img
      src={src}
      //   alt={alt}
      className="w-full h-auto opacity-0 transition-opacity duration-500"
      onLoad={(e) => e.target.classList.add("opacity-100")}
      loading="lazy"
    />
  );
};
export default ImageLoader;
