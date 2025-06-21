import { Link } from "react-router";
import logo from "../../assets/images/logoWithTitleWhite.svg";
import search from "../../assets/images/search.svg";
const Header = () => {
  return (
    <div className="flex items-center pt-[47px] pb-4 px-[50px] text-white">
      <img src={logo}  className="w-[103px] h-[31px] ml-[66px]" />
      <div className="w-[517px] h-[48px] flex items-center font-sans bg-main rounded-md px-[18px]">
        <select className="outline-none  cursor-pointer font-bold text-[14px] bg-main ml-3">
          <option value="">جميع التصنيفات</option>
          <option value="">سيارات</option>
          <option value="">عقارات</option>
          <option value="">أجهزة</option>
        </select>
        <div className="border-0 border-r border-white flex items-center">
          <button className="ml-[15px] mr-[17px] w-[19px] h-[19px]">
            <img src={search} />
          </button>
          <input
            type="text"
            className="h-[48px] border-0 bg-main  placeholder:text-white   font-normal text-[14px]"
            placeholder="بحث ..."
          />
        </div>
      </div>
      <div className="w-[236px]  flex items-center justify-end  flex-1">
        <Link
          to="/login"
          className="bg-main  rounded-[10px] h-[47px] flex-center px-[8px] ml-[20px]"
        >
          تسجيل دخول
        </Link>
        <Link to="/register">إنشاء حساب</Link>
      </div>
    </div>
  );
};

export default Header;
