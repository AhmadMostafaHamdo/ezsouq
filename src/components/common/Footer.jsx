import { Link } from "react-router";
import logo from "../../assets/images/logoWithTitleWhite.svg";
import emailIcon from "../../assets/images/ic_round-email.svg";
import phoneIcone from "../../assets/images/ic_baseline-phone.svg";
import Ellipse1 from "../../assets/images/Ellipse 14.svg";
import Ellipse2 from "../../assets/images/Ellipse 15.svg";
import instagram from "../../assets/images/ri_instagram-fill.svg";
import googlPlay from "../../assets/images/googlPlay.svg";
import facebook from "../../assets/images/ic_baseline-facebook.svg";
import whatsup from "../../assets/images/ri_whatsapp-fill.svg";
import { ulLinksFooter } from "../../data/filterData";

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
            className="w-[130px] md:w-[200px] h-[80px] mr-[66px]"
            loading="lazy"
          />
        </div>
        <div>
          <ul className="font-semibold text-[1.2rem] h-[200px] flex  gap-2 flex-col mb-8">
            {ulLinksFooter.map((link, index) => (
              <li key={index}>
                <Link to={link.link} className="text-[1rem]">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[150px] ">
          <ul className="flex flex-col gap-3">
            <li className="mb-[.9rem]">
              <Link to="" className="font-bold text-[1.2rem]">
                تواصل معنا
              </Link>
            </li>
            <li className="flex">
              <img src={emailIcon} className="ml-[10px]" loading="lazy" />
              <Link
                to=""
                className="font-semibold text-[1.2rem] text-[#D9D8FF]"
              >
                ezsouq@gmail.com
              </Link>
            </li>
            <li className="flex">
              <img src={phoneIcone} className="ml-[10px]" loading="lazy" />
              <Link
                to=""
                className="font-semibold text-[1.2rem] text-[#D9D8FF] "
              >
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
      <div className="flex-col-reverse md:flex-row flex-center f mt-10 mb-6 gap-4 md:gap-8 text-[#D9D8FF]">
        <p className="text-[12px] font-semibold ">
          © 2025 ezsouq - جميع الحقوق محفوظة
        </p>
        <img src={googlPlay} alt="" loading="lazy" />
      </div>
    </div>
  );
};

export default Footer;
