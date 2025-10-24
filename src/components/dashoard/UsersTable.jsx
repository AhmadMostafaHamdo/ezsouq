// components/dashboard/UsersTable.jsx
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import DeleteOrBanModal from "./DeleteOrBanModal";
import { UserMinus, UserPlus } from "lucide-react";

const UsersTable = ({ title = "المستخدمين", extraActions = null }) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [showBanUser, setShowBanUser] = useState(false);
  const [showGrantUser, setShowGrantUser] = useState(false);
  const [showWithdrawUser, setShowWithdrawUser] = useState(false);
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
    { key: "averageRating", label: "تقييمه" },
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
  const handleDeleteUser = async (id) => {
    if (!id) return;
    try {
      await dispatch(deleteUser(id));
      toast.success("تم حذف المستخدم بنجاح");
      dispatch(getAllUsers({ page, search: debouncedSearch }));
    } catch (err) {
      toast.error("حدث خطأ أثناء حذف المستخدم");
    } finally {
      setShowDeleteUser(false);
      setSelectedUserId(null);
    }
  };

  // Ban / Unban user
  const handleBanUser = async (id, action) => {
    if (!id) return;
    try {
      await dispatch(banUser({ id, action }));
      toast.success(action === "ban" ? "تم حظر المستخدم" : "تم إلغاء الحظر");
      dispatch(getAllUsers({ page, search: debouncedSearch }));
    } catch (err) {
      toast.error("حدث خطأ أثناء تغيير حالة الحظر");
    } finally {
      setShowBanUser(false);
      setSelectedUserId(null);
      setOpenMenuId(null);
    }
  };

  // Grant / Withdraw Permissions
  const handleChangeRole = async (userId, type) => {
    const token = Cookies.get("token");
    if (!token) return toast.error("لم يتم العثور على التوكن!");
    try {
      const url =
        type === "grant"
          ? "/admin/Granting_permissions"
          : "/admin/Withdraw_permissions";
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId }),
      });
      toast.success(type === "grant" ? "تم منح الصلاحيات" : "تم سحب الصلاحيات");
      dispatch(getAllUsers({ page, search: debouncedSearch }));
    } catch (err) {
      toast.error("حدث خطأ أثناء تغيير الصلاحيات");
    } finally {
      setOpenMenuId(null);
      setShowGrantUser(false);
      setShowWithdrawUser(false);
      setSelectedUserId(null);
    }
  };

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

          {/* Modals */}
          {showBanUser && selectedUserId && (
            <DeleteOrBanModal
              type="ban"
              action={banAction}
              onConfirm={() => handleBanUser(selectedUserId, banAction)}
              onCancel={() => setShowBanUser(false)}
            />
          )}
          {showDeleteUser && selectedUserId && (
            <DeleteOrBanModal
              type="delete"
              onConfirm={() => handleDeleteUser(selectedUserId)}
              onCancel={() => setShowDeleteUser(false)}
            />
          )}
          {showGrantUser && selectedUserId && (
            <DeleteOrBanModal
              type="grant"
              onConfirm={() => handleChangeRole(selectedUserId, "grant")}
              onCancel={() => setShowGrantUser(false)}
            />
          )}
          {showWithdrawUser && selectedUserId && (
            <DeleteOrBanModal
              type="withdraw"
              onConfirm={() => handleChangeRole(selectedUserId, "withdraw")}
              onCancel={() => setShowWithdrawUser(false)}
            />
          )}

          {/* Header */}
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

          {/* Desktop Table */}
          <div className="hidden md:block p-4 bg-white rounded-tr-3xl rounded-tl-3xl">
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
                          alt="صورة المستخدم"
                          className="rounded-full w-10 h-10 mx-auto"
                        />
                      </td>
                      <td className="py-3 text-center">{user.name}</td>
                      <td className="py-3 text-center">{user.email}</td>
                      <td className="py-3 text-center">
                        {user.averageRating?.toFixed(1) || 0}
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
                            alt="إعدادات المستخدم"
                            width={25}
                          />
                          <AnimatePresence>
                            {openMenuId === user._id && (
                              <motion.div
                                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="w-44 leading-5 absolute left-[4.2rem] rounded-lg bg-white p-3 shadow-md "
                              >
                                <Link
                                  to={user._id}
                                  className="text-[#6C63FF] duration-200 hover:bg-[#c7bbbb41] p-1 rounded-sm flex gap-2 cursor-pointer"
                                >
                                  <img src={viewsBlue} alt="عرض التفاصيل" />
                                  عرض التفاصيل
                                </Link>

                                {/* Ban / Unban */}
                                <p
                                  className={`flex ${
                                    user.Role === "BANNED"
                                      ? "text-[#30C795] hover:text-[#1E9F7C]"
                                      : "text-[#BD4749] hover:text-[#9B383A]"
                                  } gap-2 duration-200 hover:bg-[#c7bbbb41] p-1 rounded-sm cursor-pointer mt-2`}
                                  onClick={() => {
                                    setSelectedUserId(user._id);
                                    setBanAction(
                                      user.Role === "BANNED" ? "unban" : "ban"
                                    );
                                    setShowBanUser(true);
                                  }}
                                >
                                  <img src={block} alt="حظر / إلغاء الحظر" />
                                  {user.Role === "BANNED"
                                    ? "إلغاء الحظر"
                                    : "حظر"}
                                </p>

                                {/* Grant */}
                                <p
                                  className="flex gap-2 duration-200 hover:bg-[#c7bbbb41] p-1 rounded-sm cursor-pointer mt-2"
                                  onClick={() => {
                                    setSelectedUserId(user._id);
                                    setShowGrantUser(true);
                                  }}
                                >
                                  <UserPlus
                                    size={18}
                                    className="text-green-600"
                                  />
                                  <span className="text-[#4CAF50]">
                                    منح الصلاحيات
                                  </span>
                                </p>

                                {/* Withdraw */}
                                <p
                                  className="flex gap-2 duration-200 hover:bg-[#c7bbbb41] p-1 rounded-sm cursor-pointer mt-2"
                                  onClick={() => {
                                    setSelectedUserId(user._id);
                                    setShowWithdrawUser(true);
                                  }}
                                >
                                  <UserMinus
                                    size={18}
                                    className="text-yellow-600"
                                  />
                                  <span className="text-[#FFC107]">
                                    سحب الصلاحيات
                                  </span>
                                </p>

                                {/* Delete */}
                                <p
                                  className="flex gap-2 duration-200 hover:bg-[#c7bbbb41] p-1 rounded-sm cursor-pointer mt-2"
                                  onClick={() => {
                                    setSelectedUserId(user._id);
                                    setShowDeleteUser(true);
                                  }}
                                >
                                  <img src={deleteIcon} alt="حذف المستخدم" />
                                  <span className="text-[#C73030]">حذف</span>
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
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

          {/* Mobile Cards */}
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
                        alt="صورة المستخدم"
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
                      <span>تقييمه: {user.averageRating?.toFixed(1) || 0}</span>
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
                    <div className="flex flex-wrap justify-end gap-2">
                      {/* Ban / Unban */}
                      <button
                        className={`px-3 py-1 text-white text-xs rounded-md duration-200 transition ${
                          user.Role === "BANNED"
                            ? "bg-[#30C795] hover:bg-[#1E9F7C]"
                            : "bg-[#BD4749] hover:bg-[#9B383A]"
                        }`}
                        onClick={() => {
                          setSelectedUserId(user._id);
                          setBanAction(
                            user.Role === "BANNED" ? "unban" : "ban"
                          );
                          setShowBanUser(true);
                        }}
                      >
                        {user.Role === "BANNED" ? "إلغاء الحظر" : "حظر"}
                      </button>

                      {/* Grant */}
                      <button
                        className="px-3 py-1 bg-[#4CAF50] text-white text-xs rounded-md duration-200 hover:bg-[#3E8E41] transition"
                        onClick={() => {
                          setSelectedUserId(user._id);
                          setShowGrantUser(true);
                        }}
                      >
                        منح الصلاحيات
                      </button>

                      {/* Withdraw */}
                      <button
                        className="px-3 py-1 bg-[#FFC107] text-white text-xs rounded-md duration-200 hover:bg-[#E0A800] transition"
                        onClick={() => {
                          setSelectedUserId(user._id);
                          setShowWithdrawUser(true);
                        }}
                      >
                        سحب الصلاحيات
                      </button>

                      {/* Delete */}
                      <button
                        className="px-3 py-1 bg-[#C73030] text-white text-xs rounded-md duration-200 hover:bg-[#9B383A] transition"
                        onClick={() => {
                          setSelectedUserId(user._id);
                          setShowDeleteUser(true);
                        }}
                      >
                        حذف
                      </button>

                      {/* View Details */}
                      <Link
                        to={user._id}
                        className="px-3 py-1 bg-[#6C63FF] text-white text-xs rounded-md duration-200 hover:bg-[#534CF2] transition"
                      >
                        عرض التفاصيل
                      </Link>
                    </div>
                  </div>
                ))}
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
