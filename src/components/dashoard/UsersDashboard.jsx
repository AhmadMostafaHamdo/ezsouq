import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import close from "../../assets/images/close.svg";
import deleteOffer from "../../assets/images/dashboard/deleteOffer.svg";

import { getAllUsers } from "../../store/users/thunk/getAllUsers";
import { deleteUser } from "../../store/users/thunk/deleteUser";
import Pagination from "./Pagination";
import { ToastContainer } from "react-toastify";
import Spinner from "../../feedback/loading/Spinner";
import { Link } from "react-router";

const UsersDashboard = () => {
  const [infoTable, setInfoTable] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const {
    users = [],
    totalItems = 0,
    totalPages = 1,
    currentPage = 1,
    loadingDelete,
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
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  const handelSettingUser = (userId, e) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === userId ? null : userId);
  };

  // دالة حذف المستخدم
  const handelDeleteUser = (id) => {
    if (!id) return;
    dispatch(deleteUser(id))
      .then(() =>
        dispatch(getAllUsers({ page, limit: 3, search: searchQuery }))
      )
      .finally(() => {
        setShowDeleteUser(false);
        setSelectedUserId(null);
      });
  };

  useEffect(() => {
    dispatch(getAllUsers({ page, limit: 3, search: "" }));
  }, [dispatch, page]);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (menuRef.current && !menuRef.current.contains(event.target)) {
  //       setInfoTable(false);
  //     }
  //     if (detailsRef.current && !detailsRef.current.contains(event.target)) {
  //       setShowDetails(false);
  //     }
  //     if (openMenuId !== null) {
  //       setOpenMenuId(null);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [openMenuId]);

  const columns = [
    { key: "image", label: "الصورة" },
    { key: "name", label: "الاسم" },
    { key: "location", label: "البريد الإلكتروني" },
    { key: "publisher", label: "رقم الهاتف" },
    { key: "price", label: "عدد الإعلانات" },
    { key: "date", label: "الحالة" },
    { key: "actions", label: "الإجراءات" },
  ];

  return (
    <div>
      {loadingDelete ? (
        <div className="mt-64">
          <Spinner size={80} />
        </div>
      ) : (
        <>
          <ToastContainer />
          {/* مودال الحذف */}
          {showDeleteUser && selectedUserId && (
            <div className="fixed inset-0 bg-[#67676780] z-20 flex-center">
              <div className="w-96 h-[74vh] p-5 rounded-lg bg-white relative">
                <button onClick={() => setShowDeleteUser(false)}>
                  <img src={close} alt="" className="mr-auto cursor-pointer" />
                </button>
                <img src={deleteOffer} alt="" className="m-auto" />
                <p className="text-center my-5 font-bold">حذف مستخدم</p>
                <p className="text-[#444444] text-center leading-6">
                  هل أنت متأكد من أنك تريد حذف هذا المستخدم؟ لا يمكن التراجع عن
                  هذا الإجراء.
                </p>
                <div className="flex-between mt-5 font-normal">
                  <button
                    className="px-7 py-1 rounded-md text-[#818181] border border-[#818181]"
                    onClick={() => setShowDeleteUser(false)}
                  >
                    إلغاء
                  </button>
                  <button
                    className="px-7 py-1 rounded-md bg-[#BD4749] text-white"
                    onClick={() => handelDeleteUser(selectedUserId)}
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="container">
            {/* العنوان والبحث */}
            <div className="flex-between my-5 w-[60vw]">
              <h1>المستخدمون</h1>
              <div className="relative">
                <input
                  type="text"
                  className="relative p-1 pr-7 border rounded-md w-[40vw]"
                  placeholder="بحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img
                  src={search}
                  className="absolute top-1/2 -translate-y-1/2 right-2"
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
                  <div className="absolute p-2 rounded-md z-20 bg-white top-12 right-12 w-28 shadow-md">
                    <div
                      className="flex items-center text-[.7rem] gap-2 cursor-pointer"
                      onClick={handelShowDetails}
                    >
                      <img src={views} alt="" />
                      عرض/إخفاء
                      <img src={arrowLeft} alt="" width={6} />
                    </div>
                  </div>
                )}
                {showDetails && (
                  <div
                    className="absolute rounded-md w-[160px] top-[7.3rem] right-16 bg-white p-2 shadow-md z-30"
                    ref={detailsRef}
                  >
                    {columns.map((col) => (
                      <div
                        key={col.key}
                        className="text-[.8rem] mb-3 flex items-center"
                      >
                        <input
                          type="checkbox"
                          checked={visibleColumns[col.key]}
                          onChange={() => handleColumnToggle(col.key)}
                          className="ml-2"
                        />
                        {col.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* الجدول */}
            <div className="p-3 lg:p-6 bg-white rounded-tr-3xl rounded-tl-3xl">
              <div>
                <table className="font-medium w-[95vw] lg:w-full">
                  <thead>
                    <tr className="text-[#959595]">
                      {columns.map(
                        (col) =>
                          visibleColumns[col.key] && (
                            <th
                              key={col.key}
                              className="pb-4 text-[.8rem] lg:text-[.9rem]"
                            >
                              {col.label}
                            </th>
                          )
                      )}
                    </tr>
                  </thead>
                  <tbody className="text-[.8rem]">
                    {users.map((user) => (
                      <tr key={user._id} className="border-t border-[#eee]">
                        {visibleColumns.image && (
                          <td className="py-3">
                            <img src={profile} alt="" width={50} />
                          </td>
                        )}
                        {visibleColumns.name && (
                          <td className="py-3 text-center">{user.name}</td>
                        )}
                        {visibleColumns.location && (
                          <td className="py-3 text-center">{user.email}</td>
                        )}
                        {visibleColumns.publisher && (
                          <td className="py-3 text-center">
                            {user.phone || "غير متوفر"}
                          </td>
                        )}
                        {visibleColumns.price && (
                          <td className="py-3 text-center">
                            {user.adsCount || 0}
                          </td>
                        )}
                        {visibleColumns.date && (
                          <td className="py-3 text-center">
                            {user.isActive ? (
                              <span className="text-[#30C795] bg-[#EAF9F4] rounded-md px-5 py-2">
                                نشط
                              </span>
                            ) : (
                              <span className="text-[#C73030] bg-[#F9EAEA] rounded-md px-5 py-2">
                                محظور
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
                                onClick={(e) => handelSettingUser(user._id, e)}
                                alt=""
                                width={30}
                              />
                              {openMenuId === user._id && (
                                <div className="w-36 leading-7 absolute left-[4.2rem] top-3 rounded-lg bg-white p-3 shadow-md">
                                  <Link
                                    to={user._id}
                                    className="text-[#6C63FF] flex gap-2 cursor-pointer"
                                  >
                                    <img src={viewsBlue} alt="" />
                                    عرض التفاصيل
                                  </Link>
                                  <p className="flex gap-2 cursor-pointer">
                                    <img src={block} alt="" />
                                    حظر
                                  </p>
                                  <p className="flex gap-2 cursor-pointer">
                                    <img src={deleteIcon} alt="" />
                                    <span
                                      className="text-[#BD4749]"
                                      onClick={() => {
                                        setSelectedUserId(user._id);
                                        setShowDeleteUser(true);
                                      }}
                                    >
                                      حذف
                                    </span>
                                  </p>
                                </div>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination  */}
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={6}
                onPageChange={(p) => setPage(p)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersDashboard;
