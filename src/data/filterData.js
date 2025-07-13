import categories from "../assets/images/categories .svg";
import house from "../assets/images/3d-house 1.svg";
import webLap from "../assets/images/web-lap.svg";
import carCategory from "../assets/images/carCategory.svg";

export const allCategory = [
  { id: "", img: categories, title: "منوعات" },
  { id: "686705ad80008c6186f12d7a", img: carCategory, title: "سيارات" },
  { id: "686705ba80008c6186f12d7e", img: house, title: "عقارات" },
  { id: "6866fca2d1ceea95fa7e7103", img: webLap, title: "موبايلات" },
];
export const selectOptions = ["جميع التصنيفات", "سيارات", "عقارات", "أجهزة"];
export const ulLinksLogin = [
  { name: "الرئيسية", link: "/" },
  { name: "الأحدث", link: "/newest" },
  { name: "منوعات", link: "/oldest" },
  { name: "سيارات", link: "/cars" },
  { name: "عقارات", link: "/real-estate" },
  { name: "موبايلات", link: "/tech" },
  { name: "نشر إعلان", link: "/create-offer" },
];
export const ulLinks = [
  { name: "الرئيسية", link: "" },
  { name: "عنا", link: "" },
  { name: "نشر إعلان", link: "" },
  { name: "إعلاناتي", link: "" },
  { name: "اتصل بنا", link: "" },
];
export const sortOptions = [
  { value: "newest", label: "الأحدث" },
  { value: "oldest", label: "الأقدم" },
  { value: "price-low", label: "الأقل سعراً" },
  { value: "price-high", label: "الأعلى سعراً" },
];
