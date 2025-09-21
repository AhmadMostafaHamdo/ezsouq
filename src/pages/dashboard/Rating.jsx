import React, { useState, useRef, useEffect } from "react";
import iconSettingUser from "../../assets/images/dashboard/iconSettingUser.svg";
import profile from "../../assets/images/profileIcon.svg";
import search from "../../assets/images/search.svg";
import viewsBlue from "../../assets/images/dashboard/viewsBlue.svg";
import sendmsg from "../../assets/images/dashboard/sendmsg.svg";
import block from "../../assets/images/dashboard/block.svg";
import star from "../../assets/images/start.svg";
import deleteIcon from "../../assets/images/dashboard/deleteIcon.svg";
import { getAllUsers } from "../../store/users/thunk/getAllUsers";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/dashoard/Pagination";

const Rating = () => {
  const [showSetting, setShowSetting] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 3; // عدد المستخدمين لكل صفحة
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const {
    users = [],
    totalItems = 0,
    totalPages = 1,
    currentPage = 1,
  } = useSelector((state) => state.users);

  // جلب الصفحة الحالية عند التحميل أو تغير الصفحة
  useEffect(() => {
    dispatch(getAllUsers({ page, limit, search: searchQuery }));
  }, [dispatch, page, searchQuery]);

  return (
    <div>
      <div className="container">
        <div className="flex-between my-5 w-[60vw]">
          <h1>التقييمات</h1>
          <div className="relative">
            <input
              type="text"
              className="relative p-1 pr-7 border-none rounded-md w-[40vw]"
              placeholder="بحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img
              src={search}
              className="absolute top-1/2 -translate-y-1/2 right-2"
              alt="search"
            />
          </div>
        </div>

        <div className="p-3 lg:p-6 bg-white rounded-tr-3xl rounded-tl-3xl">
          <table className="font-medium w-full min-h-40">
            <thead>
              <tr className="text-[#959595] text-[.9rem]">
                <th>الصورة</th>
                <th>الاسم</th>
                <th>البريد الإلكتروني</th>
                <th>متوسط التقييم</th>
                <th>عدد التقييمات</th>
                <th>عدد الإعلانات المنشورة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody className="text-[.8rem]">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="border-t border-[#eee]">
                    <td className="py-4">
                      <img src={profile} alt="profile" width={50} />
                    </td>
                    <td className="text-center">{user.name}</td>
                    <td className="text-center">{user.email}</td>
                    <td className="text-center">
                      {user.averageRating?.toFixed(1) || "0"}
                    </td>
                    <td className="text-center">{user.ratings?.length || 0}</td>
                    <td className="text-center">{user.adsCount || 0}</td>
                    <td className="text-center">
                      <div className="flex items-center justify-center relative">
                        <img
                          src={iconSettingUser}
                          className="cursor-pointer"
                          onClick={() =>
                            setShowSetting(
                              showSetting === user._id ? null : user._id
                            )
                          }
                          alt="settings"
                          width={30}
                        />
                        {showSetting === user._id && (
                          <div className="w-36 leading-7 absolute left-[4.2rem] top-3 rounded-lg bg-white p-3 shadow">
                            <p className="text-[#6C63FF] flex gap-2">
                              <img src={viewsBlue} alt="" />
                              <span>عرض التفاصيل</span>
                            </p>
                            <p className="flex gap-2">
                              <img src={star} alt="" />
                              <span className="text-[#E9B11A]">
                                عرض التقييمات
                              </span>
                            </p>
                            <p className="flex gap-2">
                              <img src={sendmsg} alt="" />
                              <span className="text-[#5FB2D1]">
                                إرسال رسالة
                              </span>
                            </p>
                            <p className="flex gap-2">
                              <img src={block} alt="" />
                              <span>حظر</span>
                            </p>
                            <p className="flex gap-2">
                              <img src={deleteIcon} alt="" />
                              <span className="text-[#BD4749]">حذف</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    لا يوجد مستخدمين حالياً
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </div>
    </div>
  );
};

export default Rating;
