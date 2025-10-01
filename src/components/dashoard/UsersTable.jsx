import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import Spinner from "../../feedback/loading/Spinner";

import profile from "../../assets/images/profileIcon.svg";
import search from "../../assets/images/search.svg";
import views from "../../assets/images/views.svg";
import deleteIcon from "../../assets/images/dashboard/deleteIcon.svg";
import arrowLeft from "../../assets/images/dashboard/arrowLeftTable.svg";
import menuTable from "../../assets/images/dashboard/menuTable.svg";
import menuTable2 from "../../assets/images/dashboard/menuTable2.svg";
import viewsBlue from "../../assets/images/dashboard/viewsBlue.svg";
import block from "../../assets/images/dashboard/block.svg";
import close from "../../assets/images/close.svg";
import deleteOffer from "../../assets/images/dashboard/deleteOffer.svg";
import iconSettingUser from "../../assets/images/dashboard/iconSettingUser.svg";

import { getAllUsers } from "../../store/users/thunk/getAllUsers";
import { deleteUser } from "../../store/users/thunk/deleteUser";

import Pagination from "./Pagination";
import { ToastContainer } from "react-toastify";

const UsersTable = ({ title = "المستخدمين", extraActions = null }) => {
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
    loadingDelete,
    loading,
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

  useEffect(() => {
    dispatch(getAllUsers({ page, limit: 4, search: searchQuery }));
  }, [dispatch, page, searchQuery]);

  const handelDeleteUser = (id) => {
    if (!id) return;
    dispatch(deleteUser(id))
      .then(() =>
        dispatch(getAllUsers({ page, limit: 6, search: searchQuery }))
      )
      .finally(() => {
        setShowDeleteUser(false);
        setSelectedUserId(null);
      });
  };

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
              <div className="w-96 p-5 rounded-lg bg-white relative">
                <button onClick={() => setShowDeleteUser(false)}>
                  <img src={close} alt="" className="mr-auto cursor-pointer" />
                </button>
                <img src={deleteOffer} alt="" className="m-auto" />
                <p className="text-center my-5 font-bold text-lg">حذف مستخدم</p>
                <p className="text-[#444444] text-center leading-6 text-sm">
                  هل أنت متأكد من أنك تريد حذف هذا المستخدم؟ لا يمكن التراجع عن
                  هذا الإجراء.
                </p>
                <div className="flex justify-between mt-5 font-normal">
                  <button
                    className="px-5 py-1 rounded-md text-[#818181] border border-[#818181]"
                    onClick={() => setShowDeleteUser(false)}
                  >
                    إلغاء
                  </button>
                  <button
                    className="px-5 py-1 rounded-md bg-[#BD4749] text-white"
                    onClick={() => handelDeleteUser(selectedUserId)}
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          )}

          <div>
            {/* العنوان + البحث + قائمة الأعمدة */}
            <div className="flex md:items-center md:justify-between gap-3 my-5">
              <h1 className="text-lg md:text-xl font-bold">{title}</h1>
              <div className="relative md:w-[40vw]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="p-2 pr-7 rounded-md w-full border border-gray-300 text-sm"
                  placeholder="بحث..."
                />
                <img
                  src={search}
                  className="absolute top-1/2 -translate-y-1/2 right-2 w-4"
                  alt="search"
                />
              </div>
              <div className="flex justify-end gap-2 relative" ref={menuRef}>
                <img src={menuTable} alt="" className="w-8" />
                <img
                  src={menuTable2}
                  className="cursor-pointer w-8"
                  alt=""
                  onClick={handelViews}
                />
                {infoTable && (
                  <div className="absolute p-2 rounded-md z-20 bg-white top-12 right-0 w-32 shadow">
                    <div
                      className="flex items-center text-xs gap-2 cursor-pointer"
                      onClick={handelShowDetails}
                    >
                      <img src={views} alt="views" />
                      عرض/إخفاء
                      <img src={arrowLeft} alt="" width={6} />
                    </div>
                  </div>
                )}
                {showDetails && (
                  <div
                    className="absolute rounded-md w-[160px] top-[7.3rem] right-0 bg-white p-2 shadow z-30"
                    ref={detailsRef}
                  >
                    {Object.keys(visibleColumns).map((col) => (
                      <div key={col} className="text-xs mb-3 flex items-center">
                        <input
                          type="checkbox"
                          checked={visibleColumns[col]}
                          onChange={() => handleColumnToggle(col)}
                          className="ml-2"
                        />
                        {columns.find((c) => c.key === col)?.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* إجراءات إضافية */}
            {extraActions && <div className="mb-4">{extraActions}</div>}

            {/* Desktop Table */}
            <div className="hidden md:block p-4 bg-white rounded-tr-3xl rounded-tl-3xl overflow-x-auto">
              <table className="font-medium w-full text-sm">
                <thead>
                  <tr className="text-[#959595] text-sm">
                    {columns.map(
                      (col) =>
                        visibleColumns[col.key] && (
                          <th key={col.key} className="pb-4">
                            {col.label}
                          </th>
                        )
                    )}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="py-20 text-center"
                      >
                        <Spinner size={60} />
                      </td>
                    </tr>
                  ) : users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id} className="border-t border-[#eee]">
                        {visibleColumns.image && (
                          <td className="py-3">
                            <img
                              src={
                                user?.avatar
                                  ? `https://api.ezsouq.store/uploads/images/${user?.avatar}`
                                  : profile
                              }
                              alt=""
                              width={40}
                              className="rounded-full"
                            />
                          </td>
                        )}
                        {visibleColumns.name && (
                          <td className="text-center">{user.name}</td>
                        )}
                        {visibleColumns.location && (
                          <td className="text-center">{user.email}</td>
                        )}
                        {visibleColumns.publisher && (
                          <td className="text-center">
                            {user.phone || "غير متوفر"}
                          </td>
                        )}
                        {visibleColumns.price && (
                          <td className="text-center">{user.adsCount || 0}</td>
                        )}
                        {visibleColumns.date && (
                          <td className="text-center">
                            {user.isActive ? (
                              <span className="text-[#30C795] bg-[#EAF9F4] rounded-md px-4 py-1">
                                نشط
                              </span>
                            ) : (
                              <span className="text-[#C73030] bg-[#F9EAEA] rounded-md px-4 py-1">
                                محظور
                              </span>
                            )}
                          </td>
                        )}
                        {visibleColumns.actions && (
                          <td className="text-center">
                            <div className="flex justify-center relative">
                              <img
                                src={iconSettingUser}
                                className="cursor-pointer"
                                onClick={(e) => handelSettingUser(user._id, e)}
                                alt=""
                                width={25}
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
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="py-10 text-center text-gray-500"
                      >
                        لا يوجد مستخدمين
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="grid md:hidden gap-4">
              {loading ? (
                <div className="flex justify-center py-20">
                  <Spinner size={60} />
                </div>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user._id}
                    className="p-4 bg-white rounded-xl shadow flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          user?.avatar
                            ? `https://api.ezsouq.store/uploads/images/${user?.avatar}`
                            : profile
                        }
                        alt="user"
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h2 className="font-bold text-sm">{user.name}</h2>
                        <p className="text-xs text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">
                          {user.phone || "غير متوفر"}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link to={user._id}>
                          <img
                            src={viewsBlue}
                            alt="details"
                            className="w-5 cursor-pointer"
                          />
                        </Link>
                        <img
                          src={deleteIcon}
                          alt="delete"
                          className="w-5 cursor-pointer"
                          onClick={() => {
                            setSelectedUserId(user._id);
                            setShowDeleteUser(true);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>
                        إعلانات:{" "}
                        <b className="text-gray-700">{user.adsCount || 0}</b>
                      </span>
                      <span>
                        {user.isActive ? (
                          <span className="text-[#30C795]">نشط</span>
                        ) : (
                          <span className="text-[#C73030]">محظور</span>
                        )}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-10">
                  لا يوجد مستخدمين
                </p>
              )}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={6}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UsersTable;
