// components/dashboard/UsersTable.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../feedback/loading/Spinner";

import profile from "../../assets/images/profileIcon.svg";
import searchIcon from "../../assets/images/search.svg";
import viewsBlue from "../../assets/images/dashboard/viewsBlue.svg";
import deleteIcon from "../../assets/images/dashboard/deleteIcon.svg";
import block from "../../assets/images/dashboard/block.svg";
import close from "../../assets/images/close.svg";
import deleteOffer from "../../assets/images/dashboard/deleteOffer.svg";
import banUserImg from "../../assets/images/dashboard/banUserImg.svg";
import iconSettingUser from "../../assets/images/dashboard/iconSettingUser.svg";
import menuTable from "../../assets/images/dashboard/menuTable.svg";
import menuTable2 from "../../assets/images/dashboard/menuTable2.svg";
import arrowLeft from "../../assets/images/dashboard/arrowLeftTable.svg";

import { getAllUsers } from "../../store/users/thunk/getAllUsers";
import { deleteUser } from "../../store/users/thunk/deleteUser";
import { banUser } from "../../store/users/thunk/banUser";
import Pagination from "./Pagination";
import { ToastContainer } from "react-toastify";
import DeleteOrBanModal from "./DeleteOrBanModal";

const UsersTable = ({ title = "المستخدمين", extraActions = null }) => {
  const [infoTable, setInfoTable] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [showBanUser, setShowBanUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [banAction, setBanAction] = useState("ban");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const {
    users = [],
    totalItems = 0,
    totalPages = 1,
    loading,
    loadingDelete,
  } = useSelector((state) => state.users);
  console.log(users);
  const [visibleColumns, setVisibleColumns] = useState({
    image: true,
    name: true,
    location: true,
    price: true,
    date: true,
    actions: true,
  });

  const menuRef = useRef(null);
  const detailsRef = useRef(null);

  const columns = [
    { key: "image", label: "الصورة" },
    { key: "name", label: "الاسم" },
    { key: "location", label: "البريد الإلكتروني" },
    { key: "price", label: "عدد الإعلانات" },
    { key: "date", label: "الحالة" },
    { key: "actions", label: "الإجراءات" },
  ];

  // Debounce Search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch Users
  useEffect(() => {
    setOpenMenuId(false);
    dispatch(getAllUsers({ page, limit: 4, search: debouncedSearch }));
  }, [dispatch, page, debouncedSearch]);

  // Delete User
  const handelDeleteUser = (id) => {
    if (!id) return;
    dispatch(deleteUser(id))
      .then(() =>
        dispatch(getAllUsers({ page, limit: 6, search: debouncedSearch }))
      )
      .finally(() => {
        setShowDeleteUser(false);
        setSelectedUserId(null);
      });
  };

  // Ban / Unban User
  const handelBanUser = (id, action) => {
    if (!id) return;
    dispatch(banUser({ id, action }))
      .then(() =>
        dispatch(getAllUsers({ page, limit: 6, search: debouncedSearch }))
      )
      .finally(() => {
        setShowBanUser(false);
        setSelectedUserId(null);
      });
  };

  const handleColumnToggle = (column) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  const handelSettingUser = (userId, e) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === userId ? null : userId);
  };

  const handelViews = () => setInfoTable(!infoTable);
  const handelShowDetails = (e) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };

  return (
    <div>
      {loadingDelete ? (
        <div className="mt-64">
          <Spinner size={80} />
        </div>
      ) : (
        <>
          <ToastContainer />

          {/* ✅ Ban / Unban Modal */}
          {showBanUser && selectedUserId && (
            <DeleteOrBanModal
              type="ban"
              action={banAction} // "ban" أو "unban"
              onConfirm={() => handelBanUser(selectedUserId, banAction)}
              onCancel={() => setShowBanUser(false)}
            />
          )}

          {/* 🗑 Delete Modal */}
          {showDeleteUser && selectedUserId && (
            <DeleteOrBanModal
              type="delete"
              onConfirm={() => handelDeleteUser(selectedUserId)}
              onCancel={() => setShowDeleteUser(false)}
            />
          )}

          {/* ---------- Header ---------- */}
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
                src={searchIcon}
                className="absolute top-1/2 -translate-y-1/2 right-2 w-4"
                alt="بحث"
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
                    <img src={viewsBlue} alt="views" />
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

          {extraActions && <div className="mb-4">{extraActions}</div>}

          {/* ---------- Desktop Table ---------- */}
          <div className="hidden md:block p-4 bg-white rounded-tr-3xl rounded-tl-3xl ">
            <table className="font-medium w-full text-sm">
              <thead>
                <tr className="text-[#959595] text-sm py-1">
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
                    <td colSpan={columns.length} className="py-20 text-center">
                      <Spinner size={60} />
                    </td>
                  </tr>
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="border-t border-[#eee]">
                      {visibleColumns.image && (
                        <td className="py-3">
                          <img
                            src={user?.avatar || profile}
                            alt=""
                            className="rounded-full w-10 h-10"
                          />
                        </td>
                      )}
                      {visibleColumns.name && (
                        <td className="text-center py-3">{user.name}</td>
                      )}
                      {visibleColumns.location && (
                        <td className="text-center py-5">{user.email}</td>
                      )}
                      {visibleColumns.price && (
                        <td className="text-center">
                          {user.productCount || 0}
                        </td>
                      )}
                      {visibleColumns.date && (
                        <td className="text-center">
                          {user.Role === "BANNED" ? (
                            <span className="text-[#C73030] bg-[#F9EAEA] rounded-md px-4 py-1">
                              محظور
                            </span>
                          ) : (
                            <span className="text-[#30C795] bg-[#EAF9F4] rounded-md px-4 py-1">
                              نشط
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
                                  <img src={viewsBlue} alt="" /> عرض التفاصيل
                                </Link>

                                {/* ✅ Ban / Unban */}
                                {user.Role === "BANNED" ? (
                                  <p className="flex gap-2 cursor-pointer">
                                    <img src={block} alt="" />
                                    <span
                                      className="text-[#30C795]"
                                      onClick={() => {
                                        setSelectedUserId(user._id);
                                        setBanAction("unban");
                                        setShowBanUser(true);
                                      }}
                                    >
                                      إلغاء الحظر
                                    </span>
                                  </p>
                                ) : (
                                  <p className="flex gap-2 cursor-pointer">
                                    <img src={block} alt="" />
                                    <span
                                      className="text-[#BD4749]"
                                      onClick={() => {
                                        setSelectedUserId(user._id);
                                        setBanAction("ban");
                                        setShowBanUser(true);
                                      }}
                                    >
                                      حظر
                                    </span>
                                  </p>
                                )}

                                {/* 🗑 Delete */}
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

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={6}
            onPageChange={(p) => setPage(p)}
          />
        </>
      )}
    </div>
  );
};

export default UsersTable;
