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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkStatistic } from "../../store/statistic/thunk/statisticThunk";
import Spinner from "../../feedback/loading/Spinner";
import { statisticThunkCategory } from "../../store/statistic/thunk/statisticThunkCategory";
import { topUsers } from "../../store/statistic/thunk/topUsers";
import { topProducts } from "../../store/statistic/thunk/topProducts";

const Statistic = () => {
  const { statistic, topTwoUsers, topTwoProducts, loading } = useSelector(
    (state) => state.statistic
  );
  const stats = [
    {
      img: users,
      color: "#00C4CC",
      info: "مستخدم للتطبيق",
      count: statistic?.Users,
    },
    {
      img: favorites,
      color: "#F98080",
      info: "تفاعل على الإعلانات",
      count: statistic?.Likes,
    },
    {
      img: rate,
      color: "#FFCD59",
      info: "تقييم للناشرين",
      count: statistic?.Rating,
    },
    {
      img: views,
      color: "#938FD6",
      info: "مشاهدة للإعلانات",
      count: statistic?.Views,
    },
  ];
  const stats2 = [
    {
      img: messages,
      color: "#FFB078",
      info: "تعليق على الإعلانات",
      count: statistic?.Feedbacks,
    },
    {
      img: reports,
      color: "#959595",
      info: "عدد الإبلاغات الكلي",
      count: statistic?.Reports,
    },
  ];
  console.log(topTwoProducts);
  // console.log(topTwoProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkStatistic());
  }, []);
  useEffect(() => {
    dispatch(statisticThunkCategory());
  }, []);
  useEffect(() => {
    dispatch(topUsers());
  }, []);
    useEffect(() => {
      dispatch(topProducts());
    }, []);
  return (
    <>
      {loading ? (
        <div className="mt-36">
          <Spinner size={100} />
        </div>
      ) : (
        <div dir="rtl" className="p-2 ">
          <h1 className="text-[#23193E] font-bold text-xl mb-3">الإحصائيات</h1>

          {/* الصف الأول: الإحصائيات الرئيسية */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {stats.map((stat, index) => (
              <StatisticComponent key={index} {...stat} />
            ))}
          </div>

          {/* الصف الثاني: الإحصائيات الثانوية والجدول */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_2fr] gap-6">
            {/* قسم الإحصائيات الثانوية */}
            <div className="flex flex-col gap-2">
              {stats2.map((stat, index) => (
                <StatisticComponent key={index + 4} {...stat} />
              ))}
              <CarStatsDashboard />
            </div>

            {/* قسم الجدول */}
            <div className=" rounded-xl shadow-md overflow-hidden h-fit">
              <table className="w-full bg-white ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المستخدم
                    </th>
                    <th className="py-4 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الاسم
                    </th>
                    <th className="py-4 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      البريد الإلكتروني
                    </th>
                    <th className="py-4 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الهاتف
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topTwoUsers?.map((user, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4">
                        <div className="flex items-center justify-end">
                          <img
                            src={personalImg}
                            alt="صورة المستخدم"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-2 px-4 text-right text-sm font-medium text-[#23193E]">
                        {user?.userName}
                      </td>
                      <td className="py-2 px-4 text-right text-sm text-[#706F84]">
                        meaw@gmail.com
                      </td>
                      <td className="py-2 px-4 text-right text-sm text-[#706F84]">
                        {user?.phone}
                      </td>
                      <td className="py-2 px-4 text-right text-sm text-[#706F84]">
                        <img src={iconSettingUser} alt="" />
                      </td>
                    </tr> 
                  ))}
                </tbody>
              </table>
              <div></div>
              <table className="w-full bg-white mt-4 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المستخدم
                    </th>
                    <th className="py-4 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الاسم
                    </th>
                    <th className="py-4 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      البريد الإلكتروني
                    </th>
                    <th className="py-4 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الهاتف
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4">
                      <div className="flex items-center justify-end">
                        <img
                          src={personalImg}
                          alt="صورة المستخدم"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4 text-right text-sm font-medium text-[#23193E]">
                      مياو المياو
                    </td>
                    <td className="py-2 px-4 text-right text-sm text-[#706F84]">
                      meaw@gmail.com
                    </td>
                    <td className="py-2 px-4 text-right text-sm text-[#706F84]">
                      0999 999 999
                    </td>
                    <td className="py-2 px-4 text-right text-sm text-[#706F84]">
                      <img src={iconSettingUser} alt="" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">
                      <div className="flex items-center justify-end">
                        <img
                          src={personalImg}
                          alt="صورة المستخدم"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4 text-right text-sm font-medium text-[#23193E]">
                      مياو المياو
                    </td>
                    <td className="py-2 px-4 text-right text-sm text-[#706F84]">
                      meaw@gmail.com
                    </td>
                    <td className="py-2 px-4 text-right text-sm text-[#706F84]">
                      0999 999 999
                    </td>
                    <td className="py-2 px-4 text-right text-sm text-[#706F84]">
                      <img src={iconSettingUser} alt="" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Statistic;
