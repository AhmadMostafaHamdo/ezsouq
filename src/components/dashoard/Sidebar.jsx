import { NavLink } from "react-router";
import logo from "../../assets/images/logoWithTitle.svg";
import logoutImg from "../../assets/images/dashboard/logout.svg";
import { logout } from "../../store/auth/thunk/logout";
import { ulLinks } from "../../data/dashboard";
import { useDispatch } from "react-redux";
const Sidebar = () => {
  const dispatch = useDispatch();
  const handelLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="mt-[3vh] hidden lg:block">
      <div className="w-44 rounded-lg font-normal flex flex-col justify-between  h-[94vh] items-start bg-white p-4 pt-1  pb-6">
        <div>
          <img src={logo} alt="" width={100} />
          <h1 className="text-[#23193E] mt-[-.5rem] mb-3">لوحة تحكم الأدمن</h1>
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
                      ? "px-7 py-2 rounded-[10px] bg-[#E0E0FF] text-[#2F2E41] text-[.79rem] "
                      : "px-4 py-2 rounded-[10px] text-[#2F2E41] text-[.79rem]"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            </div>
          ))}
        </ul>
        <button
          className="text-[#2F2E41] flex-center gap-2 text-[.9rem] mt-3 rounded-md p-2"
          onClick={handelLogout}
        >
          <img src={logoutImg} alt="" />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
