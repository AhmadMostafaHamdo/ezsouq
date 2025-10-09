import megaphone from "../assets/images/dashboard/megaphone.svg";
import notification from "../assets/images/dashboard/notification.svg";
import report from "../assets/images/dashboard/report.svg";
import setting from "../assets/images/dashboard/setting.svg";
import star from "../assets/images/dashboard/star.svg";
import statistic from "../assets/images/dashboard/statistic-up.svg";
import users from "../assets/images/dashboard/users.svg";
import profile from "../assets/images/profileIcon.svg";

export const ulLinks = [
  {
    name: "الاحصائيات",
    link: "/dashboard",
    img: statistic,
  },

  {
    name: "الإعلانات",
    link: "/dashboard/offers",
    img: megaphone,
  },
  {
    name: "المستخدمين",
    link: "/dashboard/users",
    img: users,
  },

  {
    name: "المحافظات",
    link: "/dashboard/setting",
    img: setting,
  },
  {
    name: "التقييمات",
    link: "/dashboard/rating",
    img: star,
  },
  {
    name: "الإبلاغات",
    link: "/dashboard/reports",
    img: report,
  },
  {
    name: "الرسائل",
    link: "/dashboard/notification",
    img: notification,
  },
];
export const columnsRating = [
  {
    key: "image",
    label: "الصورة",
    visible: true,
    render: () => <img src={profile} alt="صورة المستخدم" width={50} />,
  },
  { key: "name", label: "الاسم", visible: true },
  { key: "email", label: "البريد الإلكتروني", visible: true },
  {
    key: "adsCount",
    label: "الإجراءات",
    visible: true,
    render: (user) => user.adsCount || 0,
  },
];
export const columnsReports = [
  { key: "#", label: "#", visible: true },
  { key: "reporter", label: "اسم المبلّغ", visible: true },
  { key: "reported", label: "المستخدم المبلغ عنه", visible: true },
  {
    key: "phone",
    label: "تاريخ الإبلاغ",
    visible: true,
    render: () => "مياو المياو",
  },
  {
    key: "ads",
    label: "سبب الإبلاغ",
    visible: true,
    render: () => "50 مليون",
  },
  {
    key: "status",
    label: "الحالة",
  },
];
export const columnsMessages = [
  {
    key: "name",
    label: "اسم المرسل",
    visible: true,
  },
  { key: "email", label: "البريد الالكتروني", visible: true },
  { key: "message", label: "محتوى الرسالة", visible: true },
  {
    key: "adsCount",
    label: "الإجراءات",
    visible: true,
    render: (user) => user.adsCount || 0,
  },
];
