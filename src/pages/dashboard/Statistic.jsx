import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

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
import Spinner from "../../feedback/loading/Spinner";

import { thunkStatistic } from "../../store/statistic/thunk/statisticThunk";
import { statisticThunkCategory } from "../../store/statistic/thunk/statisticThunkCategory";
import { topUsers } from "../../store/statistic/thunk/topUsers";
import { topProducts } from "../../store/statistic/thunk/topProducts";

const Statistic = () => {
  const { statistic, topTwoUsers, topTwoProducts, loading } = useSelector(
    (state) => state.statistic
  );
  const dispatch = useDispatch();

  // Fetch all dashboard data
  useEffect(() => {
    dispatch(thunkStatistic());
    dispatch(statisticThunkCategory());
    dispatch(topUsers());
    dispatch(topProducts());
  }, [dispatch]);

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

  return (
    <>
      {loading ? (
        <div className="mt-36">
          <Spinner size={100} />
        </div>
      ) : (
        <motion.div
          dir="rtl"
          className="p-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[#23193E] font-bold text-xl mb-3">الإحصائيات</h1>

          {/* Main statistics cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: 100 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.4 }}
              >
                     <StatisticComponent {...stat} />
              </motion.div>
            ))}
          </motion.div>

          {/* Secondary stats + tables */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_2fr] gap-6">
            {/* Secondary statistics */}
            <div className="flex flex-col gap-2">
              {stats2.map((stat, index) => (
                <motion.div
                  key={index + 4}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <StatisticComponent {...stat} />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <CarStatsDashboard />
              </motion.div>
            </div>

            {/* Users and products tables */}
            <motion.div
              className="rounded-xl shadow-md overflow-hidden h-fit"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Top users table */}
              <table className="w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المستخدم
                    </th>
                    <th className="py-4 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الاسم
                    </th>
                    <th className="py-4 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      عدد الإعلانات
                    </th>
                    <th className="py-4 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الهاتف
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topTwoUsers?.map((user, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                    >
                      <td className="py-2 px-4">
                        <div className="flex items-center justify-end">
                          <img
                            loading="lazy"
                            src={
                              user?.avatar?.startsWith("http")
                                ? user.avatar.replace(/^http/, "https")
                                : personalImg
                            }
                            alt="صورة المستخدم"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-2 px-4 text-center text-sm font-medium text-[#23193E]">
                        {user?.userName}
                      </td>
                      <td className="py-2 px-4 text-center text-sm text-[#706F84]">
                        {user?.totalProducts}
                      </td>
                      <td className="py-2 px-4 text-center text-sm text-[#706F84]">
                        {user?.phone}
                      </td>
                      <td className="py-2 px-4 text-center">
                        <img
                          src={iconSettingUser}
                          alt="إعدادات المستخدم"
                          loading="lazy"
                        />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {/* Top products table */}
              <table className="w-full bg-white mt-4">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الصورة
                    </th>
                    <th className="py-4 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الاسم
                    </th>
                    <th className="py-4 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإعجابات
                    </th>
                    <th className="py-4 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المشاهدات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(topTwoProducts) &&
                    topTwoProducts.slice(0, 2).map((product, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                      >
                        <td className="py-2 px-4">
                          <div className="flex items-center justify-end">
                            <img
                              loading="lazy"
                              src={
                                product?.main_photo
                                  ? `${import.meta.env.VITE_API_BASE_URL}/uploads/images/${product.main_photo}`
                                  : personalImg
                              }
                              alt="صورة المنتج"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="py-2 px-4 text-center text-sm font-medium text-[#23193E]">
                          {product?.name}
                        </td>
                        <td className="py-2 px-4 text-center text-sm text-[#706F84]">
                          {product?.totalLikes}
                        </td>
                        <td className="py-2 px-4 text-center text-sm text-[#706F84]">
                          {product?.views}
                        </td>
                        <td className="py-2 px-4 text-center">
                          <img
                            src={iconSettingUser}
                            alt="إعدادات المنتج"
                            loading="lazy"
                          />
                        </td>
                      </motion.tr>
                    ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Statistic;
