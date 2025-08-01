import { NavLink } from "react-router";
import logo from "../../assets/images/logoWithTitle.svg";
import logout from "../../assets/images/dashboard/logout.svg";
import { ulLinks } from "../../data/dashboard";
const Sidebar = () => {
  return (
    <div className="mt-[3vh]">
      <div className="w-44 rounded-lg font-normal flex flex-col justify-between  h-[94vh] items-start bg-white p-4 pt-1  pb-6">
        <div>
          <img src={logo} alt="" width={100} />
          <h1 className="text-[#23193E] mt-[-.5rem] mb-3">لوحة تحكم الأدمن</h1>
        </div>
        <ul>
          {ulLinks?.map((link, index) => (
            <div className="flex items-center gap-2 mb-4" key={index}>
              <img src={link.img} alt="" />
              <li>
                <NavLink
                  to={link.link}
                  end={link.name === "الرئيسية"}
                  className={({ isActive }) =>
                    isActive
                      ? "px-7 py-2 rounded-[10px] bg-[#E0E0FF] text-[#2F2E41] text-[.8rem] "
                      : "px-4 py-2 rounded-[10px] text-[#2F2E41] text-[.8rem]"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            </div>
          ))}
        </ul>
        <button className="text-[#2F2E41] flex-center gap-2 text-[.9rem] mt-3">
          <img src={logout} alt="" />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
