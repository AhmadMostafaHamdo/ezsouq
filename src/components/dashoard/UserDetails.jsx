import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

import Heading from "../common/Heading";
import Spinner from "../../feedback/loading/Spinner";
import MobileCards from "./MobileCards";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import ContactInfo from "../website/ContactInfo";
import ImgProfileWithButtons from "../website/ImgProfileWithButtons";
import DeleteOrBanModal from "./DeleteOrBanModal";

import profile from "../../assets/images/profileIcon.svg";
import start from "../../assets/images/start.svg";

import { getAllUsers } from "../../store/users/thunk/getAllUsers";
import { deleteUser } from "../../store/users/thunk/deleteUser";
import { productsThunkForMe } from "../../store/product/thunk/productsThunkById";
import { banUser } from "../../store/users/thunk/banUser";
import { deleteProduct } from "../../store/product/thunk/deleteProduct";

const UserDetails = () => {
  // State
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [showBanUser, setShowBanUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("posts");

  const itemsPerPage = 6;

  const dispatch = useDispatch();
  const { id } = useParams();

  // Redux states
  const { productsById, loading } = useSelector((state) => state.products);
  const { users = [], loadingDelete } = useSelector((state) => state.users);

  // Fetch user's products
  useEffect(() => {
    if (id) dispatch(productsThunkForMe(id));
  }, [dispatch, id]);

  // Fetch users
  useEffect(() => {
    dispatch(getAllUsers({ page }));
  }, [dispatch, page]);

  // Delete user
  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId))
      .then(() => dispatch(getAllUsers({ page })))
      .finally(() => {
        setShowDeleteUser(false);
        setSelectedUserId(null);
      });
  };

  // Ban user
  const handleBanUser = (userId) => {
    dispatch(banUser({ id: userId, action: "ban" }))
      .then(() => dispatch(getAllUsers({ page })))
      .finally(() => {
        setShowBanUser(false);
        setSelectedUserId(null);
      });
  };

  // Delete product
  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId))
      .then(() => {
        toast.success("تم حذف الإعلان بنجاح");
        dispatch(productsThunkForMe(id));
      })
      .catch(() => toast.error("حدث خطأ أثناء الحذف"));
  };

  // Calculate pagination on front-end
  const paginatedProducts = useMemo(() => {
    if (!productsById || !Array.isArray(productsById)) return [];
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return productsById.slice(start, end);
  }, [productsById, page]);

  const totalPages = Math.ceil((productsById?.length || 0) / itemsPerPage);
  const totalItems = productsById?.length || 0;

  // Table columns
  const columns = [
    {
      key: "photo",
      label: "الصورة",
      render: (item) => (
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          src={
            item.main_photos?.[0]
              ? `https://api.ezsouq.store/uploads/images/${item.main_photos[0]}`
              : profile
          }
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg mx-auto"
        />
      ),
    },
    { key: "name", label: "اسم الإعلان" },
    { key: "Category_name", label: "الفئة" },
    { key: "Governorate_name", label: "المحافظة" },
    { key: "city", label: "المدينة" },
    {
      key: "price",
      label: "السعر (ل.س)",
      render: (item) => (
        <span className="text-[#2C7A7B] font-semibold">
          {item.price?.toLocaleString()}
        </span>
      ),
    },
    {
      key: "likes",
      label: "الإعجابات",
      render: (item) => <span>{item.likes?.length || 0}</span>,
    },
    {
      key: "views",
      label: "المشاهدات",
      render: (item) => <span>{item.views || 0}</span>,
    },
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
      <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-0">
        {/* Sidebar */}
        <motion.div
          className="w-full md:w-1/3 lg:w-1/4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Heading title="حساب المستخدم" />

          {loading ? (
            <Spinner />
          ) : (
            <div className="space-y-2 mt-2">
              <p
                onClick={() => {
                  setShowBanUser(true);
                  setSelectedUserId(id);
                }}
                className="cursor-pointer px-3 py-2 rounded-lg hover:bg-[#5A5A5A]/10 hover:text-[#BD4749] transition"
              >
                حظر المستخدم
              </p>

              <Link
                to={`/dashboard/rating/${id}`}
                className="cursor-pointer px-3 py-2 rounded-lg text-[#FDBF18] hover:bg-[#FDBF18]/10 transition"
              >
                عرض التقييمات
              </Link>

              <p
                onClick={() => {
                  setShowDeleteUser(true);
                  setSelectedUserId(id);
                }}
                className="cursor-pointer px-3 py-2 rounded-lg text-[#BD4749] hover:bg-[#BD4749]/10 transition"
              >
                حذف المستخدم
              </p>
            </div>
          )}
        </motion.div>

        {/* Profile section */}
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

      {loadingDelete ? (
        <div className="mt-64 flex justify-center">
          <Spinner size={80} />
        </div>
      ) : (
        <>
          <ToastContainer />

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
                {/* Desktop Table */}
                <div className="hidden md:block p-4 bg-white rounded-t-3xl mt-6">
                  <DataTable
                    data={paginatedProducts}
                    columns={columns}
                    loading={loading}
                  />
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden mt-4">
                  <MobileCards
                    data={paginatedProducts}
                    loading={loading}
                    onDelete={(productId) => {
                      setSelectedProductId(productId);
                      setShowDeleteProductModal(true);
                    }}
                  />
                </div>

                {/* Pagination */}
                <div className="mt-6">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setPage}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Delete / Ban Modals */}
      <AnimatePresence>
        {showDeleteUser && selectedUserId && (
          <DeleteOrBanModal
            loading={loading}
            type="delete"
            onConfirm={() => handleDeleteUser(selectedUserId)}
            onCancel={() => setShowDeleteUser(false)}
          />
        )}

        {showBanUser && selectedUserId && (
          <DeleteOrBanModal
            loading={loading}
            type="ban"
            onConfirm={() => handleBanUser(selectedUserId)}
            onCancel={() => setShowBanUser(false)}
          />
        )}

        {showDeleteProductModal && selectedProductId && (
          <DeleteOrBanModal
            loading={loading}
            type="offer"
            title="حذف الإعلان"
            message="هل أنت متأكد من حذف هذا الإعلان؟"
            onConfirm={() => {
              handleDeleteProduct(selectedProductId);
              setShowDeleteProductModal(false);
            }}
            onCancel={() => setShowDeleteProductModal(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserDetails;
