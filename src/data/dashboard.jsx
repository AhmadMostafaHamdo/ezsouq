import home from "../assets/images/dashboard/home.svg";
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
    name: "الإشعارات",
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
     key: "averageRating",
     label: "متوسط التقييم",
     visible: true,
     render: (user) => user.averageRating?.toFixed(1) || "0",
   },
   {
     key: "ratingsCount",
     label: "عدد التقييمات",
     visible: true,
     render: (user) => user.ratings?.length || 0,
   },
   {
     key: "adsCount",
     label: "عدد الإعلانات المنشورة",
     visible: true,
     render: (user) => user.adsCount || 0,
   },
 ];
export   const columnsReports = [
  {
    key: "image",
    label: "الصورة",
    visible: true,
    render: () => <img src={profile} alt="صورة المستخدم" width={50} />,
  },
  { key: "name", label: "الاسم", visible: true },
  { key: "email", label: "البريد الإلكتروني", visible: true },
  {
    key: "phone",
    label: "رقم الهاتف",
    visible: true,
    render: () => "مياو المياو",
  },
  {
    key: "ads",
    label: "عدد الإعلانات",
    visible: true,
    render: () => "50 مليون",
  },
  {
    key: "status",
    label: "الحالة",
    visible: true,
    render: () => (
      <span className="text-[#30C795] bg-[#EAF9F4] rounded-md px-4 py-1">
        نشط
      </span>
    ),
  },
];
