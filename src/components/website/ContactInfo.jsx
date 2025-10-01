import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { ToastContainer } from "react-toastify";

import ImgProfileWithButtons from "./ImgProfileWithButtons";
import Spinner from "../../feedback/loading/Spinner";

import homeInfo from "../../assets/images/homeInfo.svg";
import infoWork from "../../assets/images/infoWork.svg";
import infoSite from "../../assets/images/infoSite.svg";
import infoWhats from "../../assets/images/infoWhats.svg";
import infoMobile from "../../assets/images/infoMobile.svg";
import infoEmail from "../../assets/images/infoEmail.svg";
import updatedIcon from "../../assets/images/updatedIcon.svg";

import { updateUser } from "../../store/users/thunk/updateUser";
import { userThunkById } from "../../store/users/thunk/userThunkById";
import useUserId from "../../hooks/useUserId";

const ContactInfo = () => {
  const dispatch = useDispatch();
  const myId = useUserId(); // ID of current logged-in user
  const { id: paramId } = useParams();

  const { user, loadingUpdateUser } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    name: "",
    workplace: "",
    work_type: "",
    Location: "",
    phone: "",
    whats_app: "",
  });
  const [editableField, setEditableField] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  // Fetch user data
  useEffect(() => {
    dispatch(userThunkById(myId));
  }, [dispatch, myId]);

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        workplace: user.workplace || "",
        work_type: user.work_type || "",
        Location: user.Location || "",
        phone: user.phone || "",
        whats_app: user.whats_app || "",
      });
      setIsChanged(false);
    }
  }, [user]);

  const handleChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);

    const changed = Object.keys(updatedData).some(
      (key) => updatedData[key] !== (user?.[key] || "")
    );
    setIsChanged(changed);
  };

  const handleEditClick = (field) => setEditableField(field);
  const handleBlur = () => setEditableField(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isChanged) {
      dispatch(updateUser(formData));
      setIsChanged(false);
    }
  };

  // Data to display for other users
  const contactInfo = [
    {
      img: homeInfo,
      title: "مكان العمل",
      desc: user?.Location
        ? `${user.Location}، المزة، مكتب المنار لبيع وتأجير السيارات`
        : "لم يتم تحديده",
    },
    {
      img: infoWork,
      title: "نوع العمل",
      desc: user?.work_type || "لم يتم تحديده",
    },
    { img: infoSite, title: "مكان التواجد", desc: "دمشق ، المزة" },
    {
      img: infoEmail,
      title: "البريد الالكتروني",
      desc: user?.email || "لم يتم تحديده",
    },
    {
      img: infoWhats,
      title: "رقم الواتساب",
      desc: user?.whats_app || "لم يتم تحديده",
    },
    {
      img: infoMobile,
      title: "رقم الهاتف",
      desc: user?.phone || "لم يتم تحديده",
    },
  ];
  const location = useLocation();
  const showContactInfo = location.pathname.includes("contact-us"); // check contact tab

  return (
    <div className="container mb-10">
      <ToastContainer />
      {showContactInfo && <ImgProfileWithButtons />}
      {myId == paramId ? (
        // Current user's profile
        <div className="flex flex-col mt-3 gap-3 items-center font-normal">
          <form onSubmit={handleSubmit}>
            {[
              { field: "name", icon: null, placeholder: "الاسم" },
              { field: "workplace", icon: infoSite, placeholder: "مكان العمل" },
              { field: "work_type", icon: infoWork, placeholder: "نوع العمل" },
              { field: "Location", icon: homeInfo, placeholder: "الموقع" },
              { field: "phone", icon: infoMobile, placeholder: "رقم الهاتف" },
              {
                field: "whats_app",
                icon: infoWhats,
                placeholder: "رقم الواتس",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <input
                  type="text"
                  disabled={editableField !== item.field}
                  className={`bg-white w-96 border mb-[.4rem] border-[#B9B5FF] px-2 pr-7 py-2 rounded-sm text-[#6C63FF] ${
                    editableField === item.field
                      ? "outline outline-1 outline-[#6C63FF]"
                      : ""
                  }`}
                  value={formData[item.field]}
                  placeholder={item.placeholder}
                  onChange={(e) => handleChange(item.field, e.target.value)}
                  onBlur={handleBlur}
                />
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={`أيقونة ${item.placeholder}`}
                    width={16}
                    className="absolute top-1/2 -translate-y-1/2 right-2"
                  />
                )}
                <img
                  src={updatedIcon}
                  alt="تعديل"
                  className="absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer"
                  onClick={() => handleEditClick(item.field)}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={!isChanged || loadingUpdateUser}
              className={`w-full p-3 rounded-md mt-4 font-medium transition ${
                !isChanged
                  ? "bg-gray-300 cursor-not-allowed text-white"
                  : "bg-primary text-white hover:opacity-90"
              }`}
            >
              {loadingUpdateUser ? <Spinner /> : "حفظ التغيرات"}
            </button>
          </form>
        </div>
      ) : (
        // Other user's profile view
        <div className="flex-center md:justify-between flex-wrap gap-7 w-[80vw] md:w-[66vw] m-auto pt-3">
          {contactInfo.map((info, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-center gap-2 rounded-lg items-center w-3/4 md:w-56 h-[30vh] p-4 shadow-[0px_15px_32.8px_0px_#23193E1A]"
            >
              <img
                src={info.img}
                alt={`أيقونة ${info.title}`}
                className="w-8 h-8"
              />
              <p className="text-[1.1rem] text-primary font-normal">
                {info.title}
              </p>
              <p className="text-center font-medium text-[1rem] text-[#3F3D56]">
                {info.desc}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
