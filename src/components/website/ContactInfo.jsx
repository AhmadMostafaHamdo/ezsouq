import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImgProfileWithButtons from "./ImgProfileWithButtons";
import homeInfo from "../../assets/images/homeInfo.svg";
import infoWork from "../../assets/images/infoWork.svg";
import infoSite from "../../assets/images/infoSite.svg";
import infoWhats from "../../assets/images/infoWhats.svg";
import infoMobile from "../../assets/images/infoMobile.svg";
import updatedIcon from "../../assets/images/updatedIcon.svg";
import { updateUser } from "../../store/users/thunk/updateUser";
import useUserId from "../../hooks/useUserId";
import { userThunkById } from "../../store/users/thunk/userThunkById";
import { ToastContainer } from "react-toastify";
import Spinner from "../../feedback/loading/Spinner";
import { useParams } from "react-router";
import infoEmail from "../../assets/images/infoEmail.svg";

const ContactInfo = () => {
  const dispatch = useDispatch();
  const id = useUserId();
  const params = useParams();
  const { user, loadingUpdateUser } = useSelector((state) => state.users);

  const contactInfo = [
    {
      img: homeInfo,
      title: "مكان العمل",
      desc: `${user?.Location}، المزة، مكتب المنار لبيع وتأجير السيارات`,
    },
    { img: infoWork, title: "نوع العمل", desc: `${user?.work_type}` },
    { img: infoSite, title: "مكان التواجد", desc: "دمشق ، المزة" },
    { img: infoEmail, title: "البريد الالكتروني", desc: `${user?.email}` },
    { img: infoWhats, title: "رقم الواتساب", desc: `${user?.whats_app}` },
    { img: infoMobile, title: "رقم الهاتف", desc: `${user?.phone}` },
  ];

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

  useEffect(() => {
    dispatch(userThunkById(id));
  }, [dispatch, id]);

  // تحديث الفورم بعد جلب بيانات المستخدم
  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || "",
        workplace: user?.workplace || "",
        work_type: user?.work_type || "",
        Location: user?.Location || "",
        phone: user?.phone || "",
        whats_app: user?.whats_app || "",
      });
      setIsChanged(false); // reset بعد تحميل البيانات
    }
  }, [user]);

  const handleChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);

    // التحقق إن كان هناك تعديل فعلي عن بيانات السيرفر
    const changed = Object.keys(updatedData).some(
      (key) => updatedData[key] !== (user?.[key] || "")
    );
    setIsChanged(changed);
  };

  const handleEditClick = (field) => {
    setEditableField(field);
  };

  const handleBlur = () => {
    setEditableField(null);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (isChanged) {
      dispatch(updateUser(formData));
      setIsChanged(false);
    }
  };

  return (
    <div className="container mb-10">
      <ToastContainer />
      <ImgProfileWithButtons />
      {id == params.id ? (
        <>
          {/* profile me */}
          <div className="flex flex-col mt-3 gap-3 items-center font-normal">
            <form onSubmit={handelSubmit}>
              {[
                { field: "name", icon: null, placeholder: "الاسم" },
                {
                  field: "workplace",
                  icon: infoSite,
                  placeholder: "مكان العمل",
                },
                {
                  field: "work_type",
                  icon: infoWork,
                  placeholder: "نوع العمل",
                },
                { field: "Location", icon: homeInfo, placeholder: "الموقع" },
                { field: "phone", icon: infoMobile, placeholder: "رقم الهاتف" },
                {
                  field: "whats_app",
                  icon: infoWhats,
                  placeholder: "رقم الواتس",
                },
              ].map((item, index) => (
                <div key={index} className="relative">
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

              <button
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
