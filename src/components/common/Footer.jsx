import { Link } from "react-router";
import logo from "../../assets/images/logoWithTitleWhite.svg";
import emailIcon from "../../assets/images/ic_round-email.svg";
import phoneIcone from "../../assets/images/ic_baseline-phone.svg";
import Ellipse1 from "../../assets/images/Ellipse 14.svg";
import Ellipse2 from "../../assets/images/Ellipse 15.svg";
import instagram from "../../assets/images/ri_instagram-fill.svg";
import facebook from "../../assets/images/ic_baseline-facebook.svg";
import whatsup from "../../assets/images/ri_whatsapp-fill.svg";

const Footer = () => {
  return (
    <div className="flex items-center justify-between   font-sans h-[450px] text-white relative">
      <img
        src={Ellipse1}
        className="top-[-108px] left-[-0.3px] rotate-[-29.17px] absolute w-[249.68px] h-[249.68px]"
      />
      <div className="overflow-hidden top-[168px] right-[-108px] rotate-[-29.17px] absolute w-[249.68px] h-[249.68px]">
        <img src={Ellipse2} />
      </div>
      <div>
        <img src={logo} className="w-[288.64px] h-[88px] mr-[66px]" />
      </div>
      <div>
        <ul className="font-semibold text-[20px] h-[213px] flex flex-col justify-between">
          <li>
            <Link to="">الرئيسية</Link>
          </li>
          <li>
            <Link to="">عنا</Link>
          </li>
          <li>
            <Link to="">نشر إعلان</Link>
          </li>
          <li>
            <Link to="">إعلاناتي</Link>
          </li>
          <li>
            <Link to="">اتصل بنا</Link>
          </li>
        </ul>
      </div>
      <div className="w-[198px]">
        <ul>
          <li className="mb-[15px]">
            <Link to="" className="font-bold text-[24px]">
              تواصل معنا
            </Link>
          </li>
          <li className="flex">
            <img src={emailIcon} className="ml-[10px]" />
            <Link to="" className="font-semibold text-[20px] text-[#D9D8FF]">
              ezsouq@gmail.com
            </Link>
          </li>
          <li className="flex">
            <img src={phoneIcone} className="ml-[10px]" />
            <Link to="" className="font-semibold text-[20px] text-[#D9D8FF] ">
              099999999
            </Link>
          </li>
        </ul>
        <div>
          <img src={instagram} />
          <img src={facebook} />
          <img src={whatsup} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
