import StatisticComponent from "../../components/dashoard/StatisticComponent";
import favorites from "../../assets/images/dashboard/statistic/favorites.svg";
import rate from "../../assets/images/dashboard/statistic/rate.svg";
import users from "../../assets/images/dashboard/statistic/users.svg";
import views from "../../assets/images/dashboard/statistic/views.svg";
import messages from "../../assets/images/dashboard/statistic/messages.svg";
import reports from "../../assets/images/dashboard/statistic/reports.svg";
import personalImg from "../../assets/images/personal.svg";
import iconSettingUser from "../../assets/images/dashboard/iconSettingUser.svg";
import CarStatsDashboard from "./CarStatsDashboard";

const Statistic = () => {
  const stats = [
    { img: users, color: "#00C4CC", info: "مستخدم للتطبيق", count: 1600 },
    {
      img: favorites,
      color: "#F98080",
      info: "تفاعل على الإعلانات",
      count: 600,
    },
    { img: rate, color: "#FFCD59", info: "تقييم للناشرين", count: 200 },
    { img: views, color: "#938FD6", info: "مشاهدة للإعلانات", count: 1400 },
  ];
  const stats2 = [
    {
      img: messages,
      color: "#FFB078",
      info: "تعليق على الإعلانات",
      count: 777,
    },
    {
      img: reports,
      color: "#959595",
      info: "عدد الإبلاغات الكلي",
      count: 600,
    },
  ];

  return (
    <div dir="rtl" className="p-4">
      <h1 className="text-[#23193E] font-bold text-xl mb-6">الإحصائيات</h1>

      {/* الصف الأول: الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <StatisticComponent key={index} {...stat} />
        ))}
      </div>

      {/* الصف الثاني: الإحصائيات الثانوية والجدول */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_2fr] gap-6">
        {/* قسم الإحصائيات الثانوية */}
        <div className="flex flex-col gap-4">
          {stats2.map((stat, index) => (
            <StatisticComponent key={index + 4} {...stat} />
          ))}
          <CarStatsDashboard />
        </div>

        {/* قسم الجدول */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المستخدم
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الاسم
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  البريد الإلكتروني
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الهاتف
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end">
                    <img
                      src={personalImg}
                      alt="صورة المستخدم"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                </td>
                <td className="py-4 px-4 text-right text-sm font-medium text-[#23193E]">
                  مياو المياو
                </td>
                <td className="py-4 px-4 text-right text-sm text-[#706F84]">
                  meaw@gmail.com
                </td>
                <td className="py-4 px-4 text-right text-sm text-[#706F84]">
                  0999 999 999
                </td>
                <td className="py-4 px-4 text-right text-sm text-[#706F84]">
                  <img src={iconSettingUser} alt="" />
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end">
                    <img
                      src={personalImg}
                      alt="صورة المستخدم"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                </td>
                <td className="py-4 px-4 text-right text-sm font-medium text-[#23193E]">
                  أحمد محمد
                </td>
                <td className="py-4 px-4 text-right text-sm text-[#706F84]">
                  ahmed@example.com
                </td>
                <td className="py-4 px-4 text-right text-sm text-[#706F84]">
                  0988 888 888
                </td>
                <td className="py-4 px-4 text-right text-sm text-[#706F84]">
                  <img src={iconSettingUser} alt="" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
