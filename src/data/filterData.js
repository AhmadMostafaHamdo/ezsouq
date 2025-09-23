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
  { name: "منوعات", link: "/all-product" },
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
  { name: "سياسة الخصوصية", link: "/privacy-policy" },
];
export const ulLinksFooter = [
  { name: "الرئيسية", link: "" },
  { name: "عنا", link: "" },
  { name: "نشر إعلان", link: "/create-offer" },
  { name: "إعلاناتي", link: "" },
  { name: "اتصل بنا", link: "/contact-us" },
  { name: "سياسة الخصوصية", link: "/privacy-policy" },
];
export const sortOptions = [
  { order: "", value: "newest", label: "الأحدث" },
  { order: "desc", value: "oldest", label: "الأقدم" },
  { order: "", value: "price", label: "الأقل سعراً" },
  { order: "desc", value: "price", label: "الأعلى سعراً" },
];
