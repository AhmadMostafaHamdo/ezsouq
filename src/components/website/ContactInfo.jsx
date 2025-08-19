import { useLocation } from "react-router";
import { contactInfo } from "../../data/contactInfo";
import homeInfo from "../../assets/images/homeInfo.svg";
import infoWork from "../../assets/images/infoWork.svg";
import infoSite from "../../assets/images/infoSite.svg";
import infoEmail from "../../assets/images/infoEmail.svg";
import infoWhats from "../../assets/images/infoWhats.svg";
import infoMobile from "../../assets/images/infoMobile.svg";
import ImgProfileWithButtons from "./ImgProfileWithButtons";
import updatedIcon from "../../assets/images/updatedIcon.svg";
const ContactInfo = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className="container  mb-10">
      <ImgProfileWithButtons />
      {/* profile for user */}
      {/* <div className="flex-center md:justify-between  flex-wrap gap-7 w-[80vw] md:w-[66vw] m-auto pt-3">
        {contactInfo.map((info, index) => (
          <div
            key={index}
            className="flex flex-col justify-center gap-2 rounded-lg items-center w-3/4   md:w-56 h-[30vh] p-4 shadow-[0px_15px_32.8px_0px_#23193E1A]"
          >
            <img src={info.img} alt="" className="w-8 h-8" />
            <p className="text-[1.1rem] text-primary font-normal">
              {info.title}
            </p>
            <p className="text-center font-medium text-[1rem] text-[#3F3D56]">
              {info.desc}
            </p>
          </div>
        ))}
      </div> */}
      {/* profile me */}
      <div className="flex flex-col gap-2 items-center font-normal">
        <div className="relative">
          <input
            type="text"
            disabled
            className="bg-white w-96 border-solid border-1 border-[#B9B5FF] px-2 py-1 rounded-sm text-[#6C63FF]"
            value="أحمد حمدو"
          />
          <img
            src={updatedIcon}
            alt=""
            className="absolute top-1/2 -translate-y-1/2 left-2  "
          />
        </div>
        <div className="relative">
          <input
            type="text"
            disabled
            className="bg-white w-96 border-solid border-1 border-[#B9B5FF] pr-6 py-1 rounded-sm text-[#6C63FF]"
            value="الموقع"
          />
          <img
            src={infoSite}
            alt=""
            width={14}
            className="absolute top-1/2 -translate-y-1/2 right-2"
          />
          <img
            src={updatedIcon}
            alt=""
            className="absolute top-1/2 -translate-y-1/2 left-2"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            disabled
            className="bg-white w-96 border-solid border-1 border-[#B9B5FF] pr-6 py-1 rounded-sm text-[#6C63FF]"
            value="نوع العمل"
          />
          <img
            src={infoWork}
            alt=""
            width={14}
            className="absolute top-1/2 -translate-y-1/2 right-2"
          />
          <img
            src={updatedIcon}
            alt=""
            className="absolute top-1/2 -translate-y-1/2 left-2"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            disabled
            className="bg-white w-96 border-solid border-1 border-[#B9B5FF] pr-6 py-1 rounded-sm text-[#6C63FF]"
            value="مكان العمل"
          />
          <img
            src={homeInfo}
            alt=""
            width={14}
            className="absolute top-1/2 -translate-y-1/2 right-2"
          />
          <img
            src={updatedIcon}
            alt=""
            className="absolute top-1/2 -translate-y-1/2 left-2"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            disabled
            className="bg-white w-96 border-solid border-1 border-[#B9B5FF] pr-6 py-1 rounded-sm text-[#6C63FF]"
            value="0999 999 999"
          />
          <img
            src={infoMobile}
            alt=""
            width={14}
            className="absolute top-1/2 -translate-y-1/2 right-2"
          />
          <img
            src={updatedIcon}
            alt=""
            className="absolute top-1/2 -translate-y-1/2 left-2"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            disabled
            className="bg-white w-96 border-solid border-1 border-[#B9B5FF] pr-6 py-1 rounded-sm text-[#6C63FF]"
            value="رقم الواتساب"
          />
          <img
            src={infoWhats}
            alt=""
            width={14}
            className="absolute top-1/2 -translate-y-1/2 right-2"
          />
          <img
            src={updatedIcon}
            alt=""
            className="absolute top-1/2 -translate-y-1/2 left-2"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            disabled
            className="bg-white w-96 border-solid border-1 border-[#B9B5FF] pr-6 py-1 rounded-sm text-[#6C63FF]"
            value="البريد الالكتروني"
          />
          <img
            src={infoEmail}
            alt=""
            width={14}
            className="absolute top-1/2 -translate-y-1/2 right-2"
          />
          <img
            src={updatedIcon}
            alt=""
            className="absolute top-1/2 -translate-y-1/2 left-2"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
