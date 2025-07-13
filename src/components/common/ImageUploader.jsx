import addImg from "../../assets/images/addImg.svg";
import closeImg from "../../assets/images/closeImg.svg";
import React, { useCallback, useMemo, useRef } from "react";
import { useFormContext } from "react-hook-form";

const ImageUploader = ({ label, name, error }) => {
  const { setValue, watch } = useFormContext();
  const fileInputRef = useRef(null);
  const imageUrlsRef = React.useRef([]);

  const images = watch(name) || [];

  const imageUrls = useMemo(() => {
    imageUrlsRef.current.forEach(URL.revokeObjectURL);
    const newUrls = images.map((image) => URL.createObjectURL(image));
    imageUrlsRef.current = newUrls;
    return newUrls;
  }, [images]);

  const handleAddImages = useCallback(
    (e) => {
      if (e.target.files.length > 0) {
        const newImages = [...images, ...Array.from(e.target.files)];
        setValue(name, newImages, { shouldValidate: true });
      }
    },
    [images, name, setValue]
  );

  const removeImage = useCallback(
    (index) => {
      const newImages = images.filter((_, i) => i !== index);
      setValue(name, newImages, { shouldValidate: true });
    },
    [images, name, setValue]
  );

  React.useEffect(() => {
    return () => imageUrlsRef.current.forEach(URL.revokeObjectURL);
  }, []);

  return (
    <div className="w-full">
      <div
        onClick={() => fileInputRef.current.click()}
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
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleAddImages}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}

      <div className="flex flex-wrap gap-2 mt-3">
        {imageUrls.map((url, index) => (
          <ImagePreview
            key={index}
            url={url}
            onRemove={() => removeImage(index)}
          />
        ))}
        <div
          onClick={() => fileInputRef.current.click()}
          className="cursor-pointer w-16 h-16 border border-dashed border-[#B9B5FF] rounded flex items-center justify-center"
        >
          <img
            src={addImg}
            alt="إضافة صورة"
            className="w-8 h-8"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

const ImagePreview = ({ url, onRemove }) => (
  <div className="relative">
    <img
      src={url}
      className="w-16 h-16 object-cover rounded border border-[#B9B5FF]"
      alt="الصورة المرفوعة"
    />
    <button
      type="button"
      onClick={onRemove}
      className="absolute top-0 right-0 z-10 cursor-pointer bg-white rounded-full w-5 h-5 flex items-center justify-center"
    >
      <img
        src={closeImg}
        alt="إزالة الصورة"
        className="w-3 h-3"
        loading="lazy"
      />
    </button>
  </div>
);

export default ImageUploader;
