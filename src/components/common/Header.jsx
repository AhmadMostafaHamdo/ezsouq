import { Link } from "react-router";
import logo from "../../assets/images/logoWithTitleWhite.svg";
import search from "../../assets/images/search.svg";
import { selectOptions } from "../../data/filterData";
const Header = () => {
  return (
    <div className="flex items-center pt-[2.5rem]  px-[3.125rem] text-white bg-primary ">
      <img src={logo} className="!w-[150px] !h-[50px] ml-[66px]" />
      <div className="hidden md:flex w-[32.3125rem] h-[3rem]  items-center font-sans bg-main rounded-md px-[18px]">
        <select className="outline-none  cursor-pointer font-bold text-[14px] bg-main ml-3">
          {selectOptions.map((option, index) => (
            <option key={index} value={option[index]}>
              {option}
            </option>
          ))}
        </select>
        <div className="border-0 border-r border-white flex items-center">
          <button className="ml-[0.93rem] mr-[1.0625rem] w-[1.187rem] h-[1.187rem]">
            <img src={search} />
          </button>
          <input
            type="text"
            className="h-[3rem] border-0 bg-main  placeholder:text-white   font-normal text-[0.875rem]"
            placeholder="بحث ..."
          />
        </div>
      </div>
      <div className="w-[14.75rem] hidden md:flex items-center justify-end  flex-1">
        <Link
          to="/login"
          className="bg-main  hover:bg-primary  rounded-[10px] h-[2.93rem] flex-center px-[8px] ml-[1.25rem]"
        >
          تسجيل دخول
        </Link>
        <Link to="/register">إنشاء حساب</Link>
      </div>
    </div>
  );
};

export default Header;
