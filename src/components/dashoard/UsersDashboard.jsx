import React, { useState, useRef, useEffect } from "react";
import iconSettingUser from "../../assets/images/dashboard/iconSettingUser.svg";
import profile from "../../assets/images/profileIcon.svg";
import search from "../../assets/images/search.svg";
import views from "../../assets/images/views.svg";
import deleteIcon from "../../assets/images/dashboard/deleteIcon.svg";
import arrowLeft from "../../assets/images/dashboard/arrowLeftTable.svg";
import arrowRight from "../../assets/images/dashboard/arrowRightTable.svg";
import menuTable from "../../assets/images/dashboard/menuTable.svg";
import menuTable2 from "../../assets/images/dashboard/menuTable2.svg";
import viewsBlue from "../../assets/images/dashboard/viewsBlue.svg";
import sendmsg from "../../assets/images/dashboard/sendmsg.svg";
import block from "../../assets/images/dashboard/block.svg";

const UsersDashboard = () => {
  const [infoTable, setInfoTable] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
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

  const handelViews = () => {
    setInfoTable(!infoTable);
  };

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

  // إغلاق القوائم عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setInfoTable(false);
      }
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        setShowDetails(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handelSettingUser = () => {
    setShowSetting(!showSetting);
  };
  return (
    <div>
      <div className="container">
        <div className="flex-between my-5 w-[60vw]">
          <h1>الإعلانات</h1>
          <div className="relative">
            <input
              type="text "
              className="relative p-1 pr-7 border-none rounded-md w-[40vw]"
              placeholder="بحث..."
            />
            <img
              src={search}
              className="filter invert-0 brightness-0 contrast-100 absolute top-1/2 -translate-y-1/2 right-2"
              alt=""
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
              <div className="absolute p-2 rounded-md z-20 bg-white top-12 right-12 w-28 shadow-[0px_4px_15.8px_0px_#0000001F]">
                <div
                  className="flex items-center text-[.7rem] gap-2 cursor-pointer"
                  onClick={handelShowDetails}
                >
                  <img src={views} alt="" />
                  عرض/إخفاء
                  <img src={arrowLeft} alt="" width={6} />
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <img src={deleteIcon} alt="" />
                  حذف
                </div>
              </div>
            )}
            {showDetails && (
              <div
                className="absolute rounded-md w-[160px] top-[7.3rem] right-16 bg-white p-2 shadow-[0px_4px_15.8px_0px_#0000001F] z-30"
                ref={detailsRef}
              >
                <div className="text-[.8rem] mb-3 flex items-center">
                  <input
                    type="checkbox"
                    checked={visibleColumns.image}
                    onChange={() => handleColumnToggle("image")}
                    className="ml-2"
                  />
                  الصورة
                </div>
                <div className="text-[.8rem] mb-3 flex items-center">
                  <input
                    type="checkbox"
                    checked={visibleColumns.name}
                    onChange={() => handleColumnToggle("name")}
                    className="ml-2"
                  />
                  العنوان
                </div>
                <div className="text-[.8rem] mb-3 flex items-center">
                  <input
                    type="checkbox"
                    checked={visibleColumns.location}
                    onChange={() => handleColumnToggle("location")}
                    className="ml-2"
                  />
                  المكان
                </div>
                <div className="text-[.8rem] mb-3 flex items-center">
                  <input
                    type="checkbox"
                    checked={visibleColumns.publisher}
                    onChange={() => handleColumnToggle("publisher")}
                    className="ml-2"
                  />
                  اسم الناشر
                </div>
                <div className="text-[.8rem] mb-3 flex items-center">
                  <input
                    type="checkbox"
                    checked={visibleColumns.price}
                    onChange={() => handleColumnToggle("price")}
                    className="ml-2"
                  />
                  السعر
                </div>
                <div className="text-[.8rem] mb-3 flex items-center">
                  <input
                    type="checkbox"
                    checked={visibleColumns.date}
                    onChange={() => handleColumnToggle("date")}
                    className="ml-2"
                  />
                  تاريخ النشر
                </div>
                <div className="text-[.8rem] mb-3 flex items-center">
                  <input
                    type="checkbox"
                    checked={visibleColumns.actions}
                    onChange={() => handleColumnToggle("actions")}
                    className="ml-2"
                  />
                  الإجراءات
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 bg-white rounded-tr-3xl rounded-tl-3xl">
          <table className="font-medium w-full">
            <thead>
              <tr className="text-[#959595]">
                {visibleColumns.image && <th className="pb-4">الصورة</th>}
                {visibleColumns.name && <th className="pb-4">الاسم</th>}
                {visibleColumns.location && (
                  <th className="pb-4">البريد الإلكتروني</th>
                )}
                {visibleColumns.publisher && (
                  <th className="pb-4">رقم الهاتق </th>
                )}
                {visibleColumns.price && (
                  <th className="pb-4">عدد الإعلانات</th>
                )}
                {visibleColumns.date && <th className="pb-4"> الحالة</th>}
                {visibleColumns.actions && <th className="pb-4">الإجراءات</th>}
              </tr>
            </thead>
            <tbody className="text-[.8rem]">
              <tr className="border-t border-[#eee]">
                {visibleColumns.image && (
                  <td className="py-4">
                    <img src={profile} alt="" width={50} />
                  </td>
                )}
                {visibleColumns.name && (
                  <td className="py-4">سيارة تويوتا...</td>
                )}
                {visibleColumns.location && (
                  <td className="py-4">دمشق، المزة</td>
                )}
                {visibleColumns.publisher && (
                  <td className="py-4">مياو المياو </td>
                )}
                {visibleColumns.price && <td className="py-4">50 مليون </td>}
                {visibleColumns.date && (
                  <td className="py-4">
                    {false ? (
                      <span className="text-[#30C795] bg-[#EAF9F4] rounded-md px-5 py-2">
                        نشط
                      </span>
                    ) : (
                      <span className="text-[#C73030] bg-[#F9EAEA] rounded-md px-5 py-2">
                        حظر
                      </span>
                    )}
                  </td>
                )}
                {visibleColumns.actions && (
                  <td>
                    <div className="flex items-center justify-center relative">
                      <img
                        src={iconSettingUser}
                        className="cursor-pointer"
                        onClick={handelSettingUser}
                        alt=""
                        width={30}
                      />
                      {showSetting && (
                        <div className="w-36 leading-7 absolute left-[4.2rem] top-3 rounded-lg bg-white p-3 shadow-[0px_4px_15.8px_0px_#0000001F]">
                          <p className="text-[#6C63FF] flex gap-2">
                            <img src={viewsBlue} alt="" />
                            <span>عرض التفاصيل</span>
                          </p>
                          <p className="flex gap-2">
                            <img src={sendmsg} alt="" />
                            <span className="text-[#5FB2D1]">إرسال رسالة</span>
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
                )}
              </tr>
            </tbody>
          </table>
          <div className="flex-between text-[#959595] mt-3">
            <p>عرض 6 من 500</p>
            <div className="flex-center gap-2">
              <img src={arrowRight} alt="" className="cursor-pointer" />
              <span className="cursor-pointer">1</span>
              <span className="cursor-pointer">2</span>
              <span className="cursor-pointer">3</span>
              <span className="cursor-pointer">4</span>
              <img src={arrowLeft} alt="" className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersDashboard;
