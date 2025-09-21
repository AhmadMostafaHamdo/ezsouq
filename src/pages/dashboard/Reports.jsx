import React, { useState, useRef, useEffect } from "react";
import iconSettingUser from "../../assets/images/dashboard/iconSettingUser.svg";
import profile from "../../assets/images/profileIcon.svg";
import search from "../../assets/images/search.svg";
import viewsBlue from "../../assets/images/dashboard/viewsBlue.svg";
import sendmsg from "../../assets/images/dashboard/sendmsg.svg";
import block from "../../assets/images/dashboard/block.svg";
import deleteIcon from "../../assets/images/dashboard/deleteIcon.svg";
import { getAllUsers } from "../../store/users/thunk/getAllUsers";
import { deleteUser } from "../../store/users/thunk/deleteUser";
import { useDispatch, useSelector } from "react-redux";

const Reports = () => {
  const [infoTable, setInfoTable] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const dispatch = useDispatch();
  const {
    users = [],
    totalItems = 0,
    totalPages = 1,
  } = useSelector((state) => state.users);

  const [visibleColumns, setVisibleColumns] = useState({
    image: true,
    name: true,
    location: true,
    publisher: true,
    price: true,
    date: true,
    actions: true,
  });

  const menuRef = useRef(null);
  const detailsRef = useRef(null);

  const handelViews = () => setInfoTable(!infoTable);
  const handelShowDetails = (e) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };
  const handleColumnToggle = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handelSettingUser = (userId, e) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === userId ? null : userId);
  };

  const handelDeleteUser = (id) => {
    dispatch(deleteUser(id));
    setOpenMenuId(null);
  };

  // جلب بيانات الصفحة الحالية
  useEffect(() => {
    dispatch(getAllUsers({ page, limit }));
  }, [dispatch, page, limit]);

  // إغلاق القوائم عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setInfoTable(false);
      }
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        setShowDetails(false);
      }
      setOpenMenuId(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="container">
      {/* رأس الصفحة */}
      <div className="flex-between my-5 w-[60vw]">
        <h1>التقارير</h1>
        <div className="relative">
          <input
            type="text"
            className="p-1 pr-7 border-none rounded-md w-[40vw]"
            placeholder="بحث..."
          />
          <img
            src={search}
            className="absolute top-1/2 -translate-y-1/2 right-2"
            alt="search"
          />
        </div>
        <div className="flex-center gap-2 relative" ref={menuRef}>
          <img src={menuTable} alt="" width={40} />
          <img
            src={menuTable2}
            className="cursor-pointer"
            alt=""
            width={40}
            onClick={handelViews}
          />
          {infoTable && (
            <div className="absolute p-2 rounded-md z-20 bg-white top-12 right-12 w-28 shadow">
              <div
                className="flex items-center text-[.7rem] gap-2 cursor-pointer"
                onClick={handelShowDetails}
              >
                عرض/إخفاء الأعمدة
              </div>
            </div>
          )}
        </div>
      </div>

      {/* جدول المستخدمين */}
      <div className="p-3 lg:p-6 bg-white rounded-tr-3xl rounded-tl-3xl overflow-auto">
        <table className="font-medium w-[95vw] lg:w-full min-h-40">
          <thead>
            <tr className="text-[#959595] text-[.9rem]">
              {visibleColumns.image && <th>الصورة</th>}
              {visibleColumns.name && <th>الاسم</th>}
              {visibleColumns.location && <th>البريد الإلكتروني</th>}
              {visibleColumns.publisher && <th>رقم الهاتف</th>}
              {visibleColumns.price && <th>عدد الإعلانات</th>}
              {visibleColumns.date && <th>الحالة</th>}
              {visibleColumns.actions && <th>الإجراءات</th>}
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-t border-[#eee]">
                  {visibleColumns.image && (
                    <td className="py-3">
                      <img src={profile} alt="" width={50} />
                    </td>
                  )}
                  {visibleColumns.name && (
                    <td className="text-[.9rem] text-center">{user.name}</td>
                  )}
                  {visibleColumns.location && (
                    <td className="text-[.9rem] text-center">{user.email}</td>
                  )}
                  {visibleColumns.publisher && (
                    <td className="text-[.9rem] text-center">مياو المياو</td>
                  )}
                  {visibleColumns.price && (
                    <td className="text-[.9rem] text-center">50 مليون</td>
                  )}
                  {visibleColumns.date && (
                    <td className="text-[.9rem] text-center">
                      <span className="text-[#30C795] bg-[#EAF9F4] rounded-md px-5 py-2">
                        نشط
                      </span>
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td>
                      <div className="flex items-center justify-center relative">
                        <img
                          src={iconSettingUser}
                          className="cursor-pointer"
                          onClick={(e) => handelSettingUser(user._id, e)}
                          alt=""
                          width={27}
                        />
                        {openMenuId === user._id && (
                          <div className="w-36 absolute left-[4.2rem] top-3 rounded-lg bg-white p-3 shadow">
                            <p className="text-[#6C63FF] flex gap-2 cursor-pointer">
                              <img src={viewsBlue} alt="" />
                              عرض التفاصيل
                            </p>
                            <p className="flex gap-2 cursor-pointer">
                              <img src={sendmsg} alt="" />
                              إرسال رسالة
                            </p>
                            <p className="flex gap-2 cursor-pointer">
                              <img src={block} alt="" />
                              حظر
                            </p>
                            <p
                              className="flex gap-2 text-[#BD4749] cursor-pointer"
                              onClick={() => handelDeleteUser(user._id)}
                            >
                              <img src={deleteIcon} alt="" />
                              حذف
                            </p>
                          </div>
                        )}
                      </div>
                    </td>
                  )}
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

        {/* Pagination داخل المكون */}
        <div className="flex justify-center gap-2 mt-5">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            السابق
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1 ? "bg-[#6C63FF] text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
