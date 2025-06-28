import categories from "../assets/images/categories 1.svg";
import house from "../assets/images/3d-house 1.svg";
import webLap from "../assets/images/web-lap.svg";
import carCategory from "../assets/images/carCategory.svg";
import car from "../assets/images/carCard.svg";
export const governorates = [
  "الكل",
  "دمشق",
  "ريف دمشق",
  "حلب",
  "اللاذقية",
  "حمص",
  "السويداء",
  "إدلب",
  "طرطوس",
  "حماة",
  "درعا",
  "الحسكة",
  "الرقة",
  "دير الزور",
  "القنيطرة",
];
export const cities = [
  "الكل",
  "الحسكة",
  "القامشلي",
  "المالكية",
  "معبدة",
  "الجوادية",
  "القحطانية",
];
export const allCategory = [
  { img: categories, title: "منوعات" },
  { img: carCategory, title: "سيارات" },
  { img: house, title: "عقارات" },
  { img: webLap, title: "تقنيات" },
];
export const cards = [
  {
    publishedDate: "منذ 3 أيام",
    title: "تويوتا كورولا 2015",
    publisher: "أحمد عبداللًه",
    governorate: "الحسكة",
    city: "القامشلي",
    type: "اوتوماتيك",
    price: "42,000,000 ل.س",
    img: car,
  },
  {
    publishedDate: "منذ 3 أيام",
    title: "تويوتا كورولا 2015",
    publisher: "أحمد عبداللًه",
    governorate: "الحسكة",
    city: "القامشلي",
    type: "اوتوماتيك",
    price: "42,000,000 ل.س",
    img: car,
  },
  {
    publishedDate: "منذ 3 أيام",
    title: "تويوتا كورولا 2015",
    publisher: "أحمد عبداللًه",
    governorate: "الحسكة",
    city: "القامشلي",
    type: "اوتوماتيك",
    price: "42,000,000 ل.س",
    img: car,
  },
  {
    publishedDate: "منذ 3 أيام",
    title: "تويوتا كورولا 2015",
    publisher: "أحمد عبداللًه",
    governorate: "الحسكة",
    city: "القامشلي",
    type: "اوتوماتيك",
    price: "42,000,000 ل.س",
    img: car,
  },
];
export const selectOptions = ["جميع التصنيفات", "سيارات", "عقارات", "أجهزة"];
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