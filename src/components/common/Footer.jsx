import { Link } from "react-router";
import logo from "../../assets/images/logoWithTitleWhite.svg";
import emailIcon from "../../assets/images/ic_round-email.svg";
import phoneIcone from "../../assets/images/ic_baseline-phone.svg";
import Ellipse1 from "../../assets/images/Ellipse 14.svg";
import Ellipse2 from "../../assets/images/Ellipse 15.svg";
import instagram from "../../assets/images/ri_instagram-fill.svg";
import facebook from "../../assets/images/ic_baseline-facebook.svg";
import whatsup from "../../assets/images/ri_whatsapp-fill.svg";
import { ulLinks } from "../../data/filterData";

const Footer = () => {
  return (
    <div className="pt-8 text-white relative bg-primary overflow-hidden">
      <div className="flex flex-col items-center md:flex-row md:flex-between w-[100vw] md:w-[80vw]">
        <img
          src={Ellipse1}
          className="top-[-5vw] left-[-5vw] absolute w-[20vw] h-[20vw] "
        />
        <img
          src={Ellipse2}
          className=" bottom-[-5vw] right-[0]  absolute w-[16vw] h-[16vw]"
        />
        <div>
          <img
            src={logo}
            className="w-[130px] md:w-[200px] h-[88px] mr-[66px]"
            loading="lazy"
          />
        </div>
        <div>
          <ul className="font-semibold text-[1.2rem] h-[200px] flex  gap-2 flex-col">
            {ulLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.link}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[150px] ">
          <ul className="flex flex-col gap-3">
            <li className="mb-[.9rem]">
              <Link to="" className="font-bold text-[1.5rem]">
                تواصل معنا
              </Link>
            </li>
            <li className="flex">
              <img src={emailIcon} className="ml-[10px]" loading="lazy" />
              <Link to="" className="font-semibold text-[20px] text-[#D9D8FF]">
                ezsouq@gmail.com
              </Link>
            </li>
            <li className="flex">
              <img src={phoneIcone} className="ml-[10px]" loading="lazy" />
              <Link to="" className="font-semibold text-[20px] text-[#D9D8FF] ">
                099999999
              </Link>
            </li>
          </ul>
          <div className="flex-between mt-3">
            <img src={instagram} loading="lazy" />
            <img src={facebook} loading="lazy" />
            <img src={whatsup} loading="lazy" />
          </div>
        </div>
      </div>
      <p className="text-[12px] font-semibold text-[#D9D8FF] text-center mt-10 mb-14 w-[90vw]">
        © 2025 ezsouq - جميع الحقوق محفوظة
      </p>
    </div>
  );
};

export default Footer;
