import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

import Heading from "../common/Heading";
import Spinner from "../../feedback/loading/Spinner";
import MobileCards from "./MobileCards";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import ContactInfo from "../website/ContactInfo";
import ImgProfileWithButtons from "../website/ImgProfileWithButtons";

import profile from "../../assets/images/profileIcon.svg";
import start from "../../assets/images/start.svg";
import deleteIcon from "../../assets/images/dashboard/deleteIcon.svg";
import report from "../../assets/images/dashboard/report.svg";
import block from "../../assets/images/dashboard/block.svg";

import { getAllUsers } from "../../store/users/thunk/getAllUsers";
import { deleteUser } from "../../store/users/thunk/deleteUser";
import { productsThunkForMe } from "../../store/product/thunk/productsThunkById";
import { banUser } from "../../store/users/thunk/banUser";
import DeleteOrBanModal from "./DeleteOrBanModal";

const UserDetails = () => {
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [showBanUser, setShowBanUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("posts");
  const dispatch = useDispatch();
  const { id } = useParams();

  const { productsById } = useSelector((state) => state.products);
  const {
    users = [],
    totalItems = 0,
    totalPages = 1,
    loading,
    loadingDelete,
  } = useSelector((state) => state.users);

  // Fetch user's products
  useEffect(() => {
    if (id) dispatch(productsThunkForMe(id));
  }, [dispatch, id]);

  // Fetch all users
  useEffect(() => {
    dispatch(getAllUsers({ page }));
  }, [dispatch, page]);

  // Delete user
  const handleDeleteUser = (userId) => {
    if (!userId) return;
    dispatch(deleteUser(userId))
      .then(() => dispatch(getAllUsers({ page })))
      .finally(() => {
        setShowDeleteUser(false);
        setSelectedUserId(null);
      });
  };

  // Ban user
  const handleBanUser = (userId) => {
    if (!userId) return;
    dispatch(banUser({ id: userId, action: "ban" }))
      .then(() => dispatch(getAllUsers({ page, limit: 3 })))
      .finally(() => {
        setShowBanUser(false);
        setSelectedUserId(null);
      });
  };

  const columns = [
    {
      key: "image",
      label: "الصورة",
      render: (user) => (
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          src={
            user?.avatar
              ? `https://api.ezsouq.store/uploads/images/${user?.avatar}`
              : profile
          }
          alt="صورة المستخدم"
          width={40}
          className="rounded-full"
        />
      ),
    },
    { key: "name", label: "الاسم" },
    { key: "email", label: "البريد الإلكتروني" },
    { key: "location", label: "الموقع" },
    {
      key: "phone",
      label: "رقم الهاتف",
      render: (user) => user.phone || "غير متوفر",
    },
    {
      key: "adsCount",
      label: "عدد الإعلانات",
      render: (user) => user.adsCount || 0,
    },
    {
      key: "status",
      label: "الحالة",
      render: (user) =>
        user.isActive ? (
          <span className="text-[#30C795] bg-[#EAF9F4] rounded-md px-4 py-1">
            نشط
          </span>
        ) : (
          <span className="text-[#C73030] bg-[#F9EAEA] rounded-md px-4 py-1">
            محظور
          </span>
        ),
    },
    { key: "actions", label: "الإجراءات" },
  ];

  return (
    <motion.div
      className="p-2 md:p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-start  gap-6 md:gap-0 ">
        {/* Sidebar actions */}
        <motion.div
          className="w-full md:w-1/3 lg:w-1/4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Heading title="حساب المستخدم" url="/dashboard/users" />

          {loading ? (
            <Spinner />
          ) : (
            <div className="space-y-2 mt-2">
              {/* Ban user */}
              <p
                onClick={() => {
                  setShowBanUser(true);
                  setSelectedUserId(id);
                }}
                className="flex items-center gap-2 text-[#5A5A5A] cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[#5A5A5A]/10 hover:text-[#BD4749]"
              >
                <img src={block} alt="حظر المستخدم" className="w-5 h-5" />
                <span>حظر المستخدم</span>
              </p>

              {/* View ratings */}
              <Link
                to={`/dashboard/rating/${id}`}
                className="flex items-center gap-2 text-[#FDBF18] cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[#FDBF18]/10 hover:text-[#D99A00]"
              >
                <img src={start} alt="عرض التقييمات" className="w-5 h-5" />
                <span>عرض التقييمات</span>
              </Link>

              {/* View reports */}
              <Link
                to={`/dashboard/reports/${id}`}
                className="flex items-center gap-2 text-[#5A5A5A] cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[#5A5A5A]/10 hover:text-[#3D3D3D]"
              >
                <img src={report} alt="عرض الإبلاغات" className="w-5 h-5" />
                <span>عرض الإبلاغات</span>
              </Link>

              {/* Delete user */}
              <p
                onClick={() => {
                  setShowDeleteUser(true);
                  setSelectedUserId(id);
                }}
                className="flex items-center gap-2 text-[#BD4749] cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[#BD4749]/10 hover:text-[#9B383A]"
              >
                <img src={deleteIcon} alt="حذف المستخدم" className="w-5 h-5" />
                <span>حذف المستخدم</span>
              </p>
            </div>
          )}
        </motion.div>

        {/* Profile image and buttons */}
        <motion.div
          className="flex-1 w-full md:w-2/3"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <ImgProfileWithButtons
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </motion.div>
      </div>

      {/* Loading overlay */}
      {loadingDelete ? (
        <div className="mt-64 flex justify-center">
          <Spinner size={80} />
        </div>
      ) : (
        <>
          <ToastContainer />

          {/* Tabs switching */}
          <AnimatePresence mode="wait">
            {activeTab === "contact" ? (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <ContactInfo />
              </motion.div>
            ) : (
              <motion.div
                key="posts"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {/* Desktop table */}
                <div className="hidden md:block p-4 bg-white rounded-tr-3xl rounded-tl-3xl overflow-x-auto mt-6">
                  <DataTable
                    data={productsById}
                    columns={columns}
                    loading={loading}
                  />
                </div>

                {/* Mobile view */}
                <div className="md:hidden mt-4">
                  <MobileCards
                    data={productsById}
                    loading={loading}
                    renderCard={() => {}}
                  />
                </div>

                {/* Pagination */}
                <div className="mt-6">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={6}
                    onPageChange={(p) => setPage(p)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Modals with smooth motion */}
      <AnimatePresence>
        {showDeleteUser && selectedUserId && (
          <motion.div
            key="deleteModal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <DeleteOrBanModal
              loading={loading}
              type="delete"
              onConfirm={() => handleDeleteUser(selectedUserId)}
              onCancel={() => setShowDeleteUser(false)}
            />
          </motion.div>
        )}

        {showBanUser && selectedUserId && (
          <motion.div
            key="banModal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <DeleteOrBanModal
              loading={loading}
              type="ban"
              action="ban"
              onConfirm={() => handleBanUser(selectedUserId)}
              onCancel={() => setShowBanUser(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserDetails;
