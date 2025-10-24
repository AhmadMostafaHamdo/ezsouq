import iconProfile from "../assets/images/profileIcon.svg";
import phoneIcon from "../assets/images/phoneIcon.svg";
import whatsIcon from "../assets/images/whatsIcon.svg";
import carFront from "../assets/images/carFront.jpeg";
import carBack from "../assets/images/carBack.jpeg";
import carSide from "../assets/images/carSide.jpeg";
export const nav = [
  { link: "/", name: "الرئيسية" },
  { link: "/latest", name: "الاحدث" },
  { link: "/others", name: "منوعات" },
  { link: "/cars", name: "سيارات" },
  { link: "/real-estate", name: "عقارات" },
  { link: "/techniques", name: "تقنيات" },
  { link: "/create-offer", name: "نشر اعلان" },
];
export const email = [
  { img: iconProfile, info: "احمد حمدو" },
  { img: phoneIcon, info: "0987 123 456" },
  { img: whatsIcon, info: "0987 123 456" },
];
export const carImages = [
  {
    id: 1,
    img: carFront,
  },
  {
    id: 2,
    img: carBack,
  },
  {
    id: 3,
    img: carSide,
  },
];
