import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logoWithTitle.svg";
import logoutImg from "../../assets/images/dashboard/logout.svg";
import confirmLogout from "../../assets/images/confirmLogout.svg";
import { ulLinks } from "../../data/dashboard";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/thunk/logout";
import { useState } from "react";
import Cookies from "js-cookie";
const Sidebar = () => {
  const dispatch = useDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="mt-[3vh] hidden lg:block">
        <div className="w-44 rounded-lg font-normal flex flex-col justify-between h-[94vh] items-start bg-white p-4 pt-1 pb-6">
          <div>
            <img src={logo} alt="" width={100} />
            <h1 className="text-[#23193E] mt-[-.5rem] mb-3">
              لوحة تحكم الأدمن
            </h1>
          </div>

          <ul>
            {ulLinks?.map((link, index) => (
              <div className="flex items-center gap-2 mb-4" key={index}>
                <img src={link.img} alt={link.name} width={25} />
                <li>
                  <NavLink
                    to={link.link}
                    end={link.name === "الاحصائيات"}
                    className={({ isActive }) =>
                      isActive
                        ? "px-7 py-2 rounded-[10px] bg-[#E0E0FF] text-[#2F2E41] text-[.79rem]"
                        : "px-4 py-2 rounded-[10px] text-[#2F2E41] text-[.79rem]"
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              </div>
            ))}
          </ul>

          {/* زر تسجيل الخروج */}
          <button
            className="text-[#2F2E41] flex-center gap-2 text-[.9rem] mt-3 rounded-md p-2 hover:text-red"
            onClick={() => setShowLogoutModal(true)}
          >
            <img src={logoutImg} alt="" />
            تسجيل الخروج
          </button>
        </div>
      </div>

      {/* ✅ مودال تأكيد تسجيل الخروج */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-[9999]">
          <div className="bg-white rounded-2xl p-6 w-72 text-center shadow-lg">
            <img src={confirmLogout} alt="" className="w-20 m-auto" />
            <h3 className="my-2 text-black">تسجيل الخروج</h3>
            <p className="my-7 text-[#444444]">
              هل أنت متأكد من أنك تريد تسجيل الخروج؟ لا يمكنك التراجع عن هذا
              الإجراء
            </p>
            <div className="flex justify-around">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-8 py-1 text-[#818181] border-[#818181] border-[1px] border-solid rounded"
              >
                إلغاء
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red text-white rounded hover:bg-red-600"
              >
                تأكيد الخروج
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
