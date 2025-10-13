// components/dashboard/UsersTable.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../feedback/loading/Spinner";
import profile from "../../assets/images/profileIcon.svg";
import searchIcon from "../../assets/images/search.svg";
import viewsBlue from "../../assets/images/dashboard/viewsBlue.svg";
import deleteIcon from "../../assets/images/dashboard/deleteIcon.svg";
import block from "../../assets/images/dashboard/block.svg";
import iconSettingUser from "../../assets/images/dashboard/iconSettingUser.svg";
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

  const columns = [
    { key: "image", label: "الصورة" },
    { key: "name", label: "الاسم" },
    { key: "email", label: "البريد الإلكتروني" },
    { key: "adsCount", label: "عدد الإعلانات" },
    { key: "status", label: "الحالة" },
    { key: "actions", label: "الإجراءات" },
  ];

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch users
  useEffect(() => {
    dispatch(getAllUsers({ page, search: debouncedSearch }));
  }, [dispatch, page, debouncedSearch]);

  // Delete user
  const handleDeleteUser = (id) => {
    if (!id) return;
    dispatch(deleteUser(id))
      .then(() => dispatch(getAllUsers({ page, search: debouncedSearch })))
      .finally(() => {
        setShowDeleteUser(false);
        setSelectedUserId(null);
      });
  };

  // Ban / unban user
  const handleBanUser = (id, action) => {
    if (!id) return;
    dispatch(banUser({ id, action }))
      .then(() => dispatch(getAllUsers({ page, search: debouncedSearch })))
      .finally(() => {
        setShowBanUser(false);
        setSelectedUserId(null);
      });
  };

  // Toggle column menu
  const handleColumnToggle = (column) => {};

  const handleSettingUser = (userId, e) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === userId ? null : userId);
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
              action={banAction}
              onConfirm={() => handleBanUser(selectedUserId, banAction)}
              onCancel={() => setShowBanUser(false)}
            />
          )}

          {/* 🗑 Delete Modal */}
          {showDeleteUser && selectedUserId && (
            <DeleteOrBanModal
              type="delete"
              onConfirm={() => handleDeleteUser(selectedUserId)}
              onCancel={() => setShowDeleteUser(false)}
            />
          )}

          {/* ---------- Header ---------- */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 my-5">
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
                loading="lazy"
                src={searchIcon}
                className="absolute top-1/2 -translate-y-1/2 right-2 w-4"
                alt="بحث"
              />
            </div>
          </div>

          {extraActions && <div className="mb-4">{extraActions}</div>}

          {/* ---------- Desktop Table ---------- */}
          <div className="hidden md:block p-4 bg-white rounded-tr-3xl rounded-tl-3xl ">
            <table className="min-w-[600px] w-full text-sm font-medium">
              <thead>
                <tr className="text-[#959595] text-sm py-1">
                  {columns.map((col) => (
                    <th key={col.key} className="pb-4 text-center">
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={columns.length} className="py-20 text-center">
                      <Spinner size={60} />
                    </td>
                  </tr>
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t duration-200 hover:bg-[#adadad2c] border-[#eee]"
                    >
                      <td className="py-3 text-center">
                        <img
                          loading="lazy"
                          src={user?.avatar || profile}
                          alt=""
                          className="rounded-full w-10 h-10 mx-auto"
                        />
                      </td>
                      <td className="py-3 text-center">{user.name}</td>
                      <td className="py-3 text-center">{user.email}</td>
                      <td className="py-3 text-center">
                        {user.productCount || 0}
                      </td>
                      <td className="py-3 text-center">
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
                      <td className="py-3 text-center">
                        <div className="flex justify-center relative">
                          <img
                            loading="lazy"
                            src={iconSettingUser}
                            className="cursor-pointer"
                            onClick={(e) => handleSettingUser(user._id, e)}
                            alt=""
                            width={25}
                          />
                          {openMenuId === user._id && (
                            <div className="w-36 leading-7 absolute  left-[4.2rem] top-3 rounded-lg bg-white p-3 shadow-md z-20">
                              <Link
                                to={user._id}
                                className="text-[#6C63FF] duration-200 hover:bg-[#c7bbbb41] p-1 rounded-sm flex gap-2 cursor-pointer"
                              >
                                <img loading="lazy" src={viewsBlue} alt="" />{" "}
                                عرض التفاصيل
                              </Link>

                              {user.Role === "BANNED" ? (
                                <p className="flex gap-2 duration-200 hover:bg-[#c7bbbb41] p-1 rounded-sm  cursor-pointer mt-2">
                                  <img loading="lazy" src={block} alt="" />
                                  <span
                                    className="text-[#30C795]"
                                    onClick={() => {
                                      setSelectedUserId(user._id);
                                      setBanUser("unban");
                                      setShowBanUser(true);
                                    }}
                                  >
                                    إلغاء الحظر
                                  </span>
                                </p>
                              ) : (
                                <p className="flex gap-2 duration-200 hover:bg-[#c7bbbb41] p-1 rounded-sm  cursor-pointer mt-2">
                                  <img loading="lazy" src={block} alt="" />
                                  <span
                                    className="text-[#BD4749]"
                                    onClick={() => {
                                      setSelectedUserId(user._id);
                                      setBanUser("ban");
                                      setShowBanUser(true);
                                    }}
                                  >
                                    حظر
                                  </span>
                                </p>
                              )}

                              <p className="flex gap-2 duration-200 hover:bg-[#c7bbbb41] p-1 rounded-sm cursor-pointer mt-2">
                                <img loading="lazy" src={deleteIcon} alt="" />
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
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="py-10 text-center text-gray-300"
                    >
                      لا يوجد مستخدمين
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ---------- Mobile Cards ---------- */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, idx) => <Spinner key={idx} />)
              : users.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white p-4 rounded-xl shadow-md border border-gray-300"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        loading="lazy"
                        src={user.avatar || profile}
                        alt=""
                        className="w-12 h-12 rounded-full object-cover border border-gray-300"
                      />
                      <div className="flex flex-col">
                        <p className="font-semibold text-[#808080e5] text-sm">
                          {user.name}
                        </p>
                        <p className="text-[#808080b9] text-xs truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-[#808080ec] mb-2">
                      <span>عدد الإعلانات: {user.productCount || 0}</span>
                      <span
                        className={
                          user.Role === "BANNED"
                            ? "text-[#C73030]"
                            : "text-[#30C795]"
                        }
                      >
                        {user.Role === "BANNED" ? "محظور" : "نشط"}
                      </span>
                    </div>
                    <div className="flex justify-end gap-2">
                      {user.Role !== "BANNED" && (
                        <button
                          className="px-3 py-1 bg-[#BD4749] text-white text-xs rounded-md duration-200 hover:bg-[#9B383A] transition"
                          onClick={() => {
                            setSelectedUserId(user._id);
                            setBanAction("ban");
                            setShowBanUser(true);
                          }}
                        >
                          حظر
                        </button>
                      )}
                      {user.Role === "BANNED" && (
                        <button
                          className="px-3 py-1 bg-[#30C795] text-white text-xs rounded-md duration-200 hover:bg-[#1E9F7C] transition"
                          onClick={() => {
                            setSelectedUserId(user._id);
                            setBanAction("unban");
                            setShowBanUser(true);
                          }}
                        >
                          إلغاء الحظر
                        </button>
                      )}
                      <button
                        className="px-3 py-1 bg-[#30C795] text-white text-xs rounded-md duration-200 hover:bg-[#1E9F7C] transition"
                        onClick={() => {
                          setSelectedUserId(user._id);
                          setShowDeleteUser(true);
                        }}
                      >
                        حذف
                      </button>
                      <Link
                        to={user._id}
                        className="bg-[#6C63FF] text-white duration-200 hover:bg-[#c7bbbb41] p-1 rounded-md flex gap-2 cursor-pointer"
                      >
                        عرض التفاصيل
                      </Link>
                    </div>
                  </div>
                ))}
          </div>

          {/* ---------- Pagination ---------- */}
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
