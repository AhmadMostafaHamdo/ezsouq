import { contactInfo } from "../../data/contactInfo";
import ImgProfileWithButtons from "./ImgProfileWithButtons";

const ContactInfo = () => {
  return (
    <div className="container font-sans mb-10">
      <ImgProfileWithButtons />
      <div className="flex-center md:justify-between  flex-wrap gap-7 w-[80vw] md:w-[66vw] m-auto pt-3">
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
      </div>
    </div>
  );
};

export default ContactInfo;
