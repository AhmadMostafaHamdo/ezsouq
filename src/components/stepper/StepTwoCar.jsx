import React, { useRef } from "react";
import uploadVideo from "../../assets/images/uploadVideo.svg";

const StepTwoCar = () => {
  const videoInputRef = useRef(null);

  const handleVideoClick = () => {
    videoInputRef.current?.click();
  };

  return (
    <div className="w-[80vw] md:w-[60vw] lg:w-[45vw]">
      <form className="w-full flex-center flex-col gap-3 text-[#B9B5FF] pb-6">
        <input
          type="text"
          placeholder="الجهاز"
          className="w-full border-solid border-[1px] p-2 rounded-[5px] border-[#B9B5FF]"
        />
        <select className="w-full p-2 bg-white rounded-[5px] outline-none cursor-pointer border-[1px] border-solid border-[#B9B5FF]">
          <option value="">النوع</option>
          <option value="حسكة">الحسكة</option>
          <option value="درعا">درعا</option>
          <option value="اللاذقية">اللاذقية</option>
        </select>
        <input
          type="text"
          placeholder="اللون"
          className="w-full border-solid border-[1px] p-2 rounded-[5px] border-[#B9B5FF]"
        />
        <div className="flex self-start">
          <div className="ml-6">
            <input
              type="radio"
              id="new"
              className="ml-2 cursor-pointer"
              name="type"
            />
            <label htmlFor="new" className="cursor-pointer">
              جديدة
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="old"
              className="ml-2 cursor-pointer"
              name="type"
            />
            <label htmlFor="old" className="cursor-pointer">
              مستعملة
            </label>
          </div>
        </div>
        <input
          type="text"
          placeholder="المعالج"
          className="w-full border-solid border-[1px] p-2 rounded-[5px] border-[#B9B5FF]"
        />
        <input
          type="text"
          placeholder="الذاكرة"
          className="w-full border-solid border-[1px] p-2 rounded-[5px] border-[#B9B5FF]"
        />

        {/* إضافة فيديو */}
        <div
          onClick={handleVideoClick}
          className="flex-between w-full border-solid border-[1px] p-2 rounded-[5px] border-[#B9B5FF] cursor-pointer"
        >
          <p>إضافة فيديو</p>
          <img src={uploadVideo} alt="رفع فيديو" />
        </div>
        <input
          type="file"
          ref={videoInputRef}
          accept="video/*"
          className="hidden"
        />
      </form>
    </div>
  );
};

export default StepTwoCar;
