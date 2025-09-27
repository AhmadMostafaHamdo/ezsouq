import { Link, useNavigate } from "react-router";
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
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Footer = () => {
  const token = Cookies.get("token");
  let userId = null;

  if (token) {
    const { id } = jwtDecode(token);
    userId = id;
  }

  const navigate = useNavigate();

  // Handle link clicks
  const handleLinkClick = (e, link) => {
    e.preventDefault();
    if (!token && (link === "/create-offer" || link === "/profile")) {
      navigate("/login");
    } else {
      if (link === "/profile") {
        navigate(link + `/${userId}`);
      } else {
        navigate(link);
      }
    }
  };

  return (
    <div className="pt-8 text-white relative bg-primary overflow-hidden">
      {/* Background ellipses */}
      <img
        src={Ellipse1}
        className="top-[-5vw] left-[-5vw] absolute w-[20vw] h-[20vw]"
        alt="خلفية دائرية"
        loading="lazy"
      />
      <img
        src={Ellipse2}
        className="bottom-[-5vw] right-[0] absolute w-[16vw] h-[16vw]"
        alt="خلفية دائرية"
        loading="lazy"
      />

      <div className="flex flex-col items-center md:flex-row md:flex-between w-[100vw] md:w-[80vw]">
        {/* Site logo */}
        <div>
          <img
            src={logo}
            className="w-[130px] md:w-[200px] h-[80px] mr-[66px]"
            loading="lazy"
            alt="شعار الموقع"
          />
        </div>

        {/* Navigation links */}
        <div>
          <ul className="font-semibold text-[1.2rem] h-[200px] flex gap-2 flex-col mb-8">
            {ulLinksFooter.map((link, index) => (
              <li key={index}>
                <Link
                  onClick={(e) => handleLinkClick(e, link.link)}
                  to={link.link}
                  className="text-[1rem] hover:underline transition-all duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div className="w-[150px]">
          <ul className="flex flex-col gap-3">
            <li className="mb-[.9rem]">
              <span className="font-bold text-[1.2rem]">تواصل معنا</span>
            </li>

            {/* Email */}
            <li>
              <a
                href="mailto:ezsouq@gmail.com"
                className="flex items-center font-semibold text-[1.2rem] text-[#D9D8FF] hover:underline transition-all duration-200"
              >
                <img
                  src={emailIcon}
                  className="ml-[10px]"
                  loading="lazy"
                  alt="البريد الإلكتروني"
                />
                ezsouq@gmail.com
              </a>
            </li>

            {/* Phone / WhatsApp */}
            <li>
              <a
                href="https://wa.me/0996362776"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center font-semibold text-[1.2rem] text-[#D9D8FF] hover:underline transition-all duration-200"
              >
                <img
                  src={whatsup}
                  className="ml-[10px]"
                  loading="lazy"
                  alt="واتساب"
                />
                0996362776
              </a>
            </li>
          </ul>

          {/* Social media icons */}
          <div className="flex mt-3 gap-3">
            <a
              href="https://www.instagram.com/tswwqshlezsouq?igsh=cjI4dHdpMnFwbTF2&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={instagram}
                loading="lazy"
                alt="إنستغرام"
                className="transition-transform duration-300 hover:scale-125"
              />
            </a>
            <a
              href="https://www.facebook.com/share/1BQzRmqKU5/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={facebook}
                loading="lazy"
                alt="فيسبوك"
                className="transition-transform duration-300 hover:scale-125"
              />
            </a>
            <a
              href="https://whatsapp.com/channel/0029VbB9QgEDjiOmMGYpfF0z"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={whatsup}
                loading="lazy"
                alt="قناة واتساب"
                className="transition-transform duration-300 hover:scale-125"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright and Google Play */}
      <div className="flex-col-reverse md:flex-row flex-center f mt-10 mb-6 gap-4 md:gap-8 text-[#D9D8FF]">
        <p className="text-[12px] font-semibold">
          © 2025 ezsouq - جميع الحقوق محفوظة
        </p>
        <img src={googlPlay} alt="جوجل بلاي" loading="lazy" />
      </div>
    </div>
  );
};

export default Footer;
