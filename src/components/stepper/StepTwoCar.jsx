import InputCreateOffer from "../inputs/InputCreateOffer";
import Select from "../select/Select";
import uploadVideo from "../../assets/images/uploadVideo.svg";
import { useRef } from "react";

const StepTwoHome = () => {
   const videoInputRef = useRef(null);

   const handleVideoClick = () => {
     videoInputRef.current?.click();
   };
  return (
    <div className="flex flex-col gap-3 w-[80vw] md:w-[60vw] lg:w-[45vw] pb-6">
      <InputCreateOffer name="اسم السيارة" />
      <Select />
      <InputCreateOffer name="اللون" />
      <div className="flex gap-6 my-3">
        <div className="">
          <div>
            <input type="radio" className="ml-2" id="" />
            <label htmlFor="">أجار</label>
          </div>
          <div>
            <input type="radio" className="ml-2" id="" />
            <label htmlFor="">جديدة</label>
          </div>
        </div>
        <div className="">
          <div>
            <input type="radio" className="ml-2" id="" />
            <label htmlFor="">بيع</label>
          </div>
          <div>
            <input type="radio" className="ml-2" id="" />
            <label htmlFor="">مستعملة</label>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default StepTwoHome;
