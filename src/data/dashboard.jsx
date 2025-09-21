import home from "../assets/images/dashboard/home.svg";
import megaphone from "../assets/images/dashboard/megaphone.svg";
import notification from "../assets/images/dashboard/notification.svg";
import report from "../assets/images/dashboard/report.svg";
import setting from "../assets/images/dashboard/setting.svg";
import star from "../assets/images/dashboard/star.svg";
import statistic from "../assets/images/dashboard/statistic-up.svg";
import users from "../assets/images/dashboard/users.svg";
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
