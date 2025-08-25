import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import ImgProfileWithButtons from "./ImgProfileWithButtons";
import { contactInfo } from "../../data/contactInfo";

import homeInfo from "../../assets/images/homeInfo.svg";
import infoWork from "../../assets/images/infoWork.svg";
import infoSite from "../../assets/images/infoSite.svg";
import infoEmail from "../../assets/images/infoEmail.svg";
import infoWhats from "../../assets/images/infoWhats.svg";
import infoMobile from "../../assets/images/infoMobile.svg";
import updatedIcon from "../../assets/images/updatedIcon.svg";

const ContactInfo = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const { id } = jwtDecode(token);

  // كل input له state خاص به (ممكن تخليهم object)
  const [formData, setFormData] = useState({
    name: "أحمد حمدو",
    site: "الموقع",
    workType: "نوع العمل",
    workPlace: "مكان العمل",
    mobile: "0999 999 999",
    whatsapp: "رقم الواتساب",
    email: "البريد الالكتروني",
  });

  const [editableField, setEditableField] = useState(null); // مين الحقل المفتوح للتعديل

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleEditClick = (field) => {
    setEditableField(field);
  };

  const handleBlur = () => {
    setEditableField(null);
    // هنا ممكن تعمل dispatch للتحديث على السيرفر
  };

  return (
    <div className="container mb-10">
      <ImgProfileWithButtons />
      {id ? (
        <>
          {/* profile me */}
          <div className="flex flex-col gap-3 items-center font-normal">
            {[
              { field: "name", icon: null },
              { field: "site", icon: infoSite },
              { field: "workType", icon: infoWork },
              { field: "workPlace", icon: homeInfo },
              { field: "mobile", icon: infoMobile },
              { field: "whatsapp", icon: infoWhats },
              { field: "email", icon: infoEmail },``
            ].map((item, index) => (
              <div key={index} className="relative">
                <input
                  type="text"
                  disabled={editableField !== item.field}
                  className={`bg-white w-96 border border-[#B9B5FF] px-2 pr-7 py-2 rounded-sm text-[#6C63FF] ${
                    editableField === item.field
                      ? "outline outline-1 outline-[#6C63FF]"
                      : ""
                  }`}
                  value={formData[item.field]}
                  onChange={(e) => handleChange(item.field, e.target.value)}
                  onBlur={handleBlur}
                />
                {item.icon && (
                  <img
                    src={item.icon}
                    alt=""
                    width={16}
                    className="absolute top-1/2 -translate-y-1/2 right-2"
                  />
                )}
                <img
                  onClick={() => handleEditClick(item.field)}
                  src={updatedIcon}
                  alt="edit"
                  className="absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* profile for user */}
          <div className="flex-center md:justify-between flex-wrap gap-7 w-[80vw] md:w-[66vw] m-auto pt-3">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="flex flex-col justify-center gap-2 rounded-lg items-center w-3/4 md:w-56 h-[30vh] p-4 shadow-[0px_15px_32.8px_0px_#23193E1A]"
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
        </>
      )}
    </div>
  );
};

export default ContactInfo;
