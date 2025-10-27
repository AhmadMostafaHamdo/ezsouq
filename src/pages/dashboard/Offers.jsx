import React, { useState, useRef, useEffect } from "react";
import detailsUser from "../../assets/images/dashboard/detailsUser.svg";
import deleteUser from "../../assets/images/dashboard/deleteUser.svg";
import profile from "../../assets/images/profileIcon.svg";
import search from "../../assets/images/search.svg";
import views from "../../assets/images/views.svg";
import deleteIcon from "../../assets/images/dashboard/deleteIcon.svg";
import arrowLeft from "../../assets/images/dashboard/arrowLeftTable.svg";
import menuTable2 from "../../assets/images/dashboard/menuTable2.svg";
import deleteOffer from "../../assets/images/dashboard/deleteOffer.svg";
import close from "../../assets/images/close.svg";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "../../components/TimeAgo";
import { productThunk } from "../../store/product/thunk/productThunk";
import { deleteProduct } from "../../store/product/thunk/deleteProduct";
import { ToastContainer } from "react-toastify";
import Pagination from "../../components/dashoard/Pagination";
import { Link } from "react-router";
import Spinner from "../../feedback/loading/Spinner";
import { motion, AnimatePresence } from "framer-motion";

const Offers = () => {
  const [infoTable, setInfoTable] = useState(false); // Toggle table options
  const [showDetails, setShowDetails] = useState(false); // Toggle columns visibility menu
  const [deleteOfferToggle, setDeleteOfferToggle] = useState(false); // Toggle delete modal
  const [selectedProductId, setSelectedProductId] = useState(null); // Selected product to delete
  const [page, setPage] = useState(1); // Current page number

  const dispatch = useDispatch();

  // Redux state
  const {
    products = [],
    totalPages = 1,
    totalItems = 0,
    loading,
  } = useSelector((state) => state.products);

  const limit = 3; // Items per page

  // Visible columns
  const [visibleColumns, setVisibleColumns] = useState({
    image: true,
    title: true,
    location: true,
    publisher: true,
    price: true,
    date: true,
    actions: true,
  });

  const menuRef = useRef(null);
  const detailsRef = useRef(null);

  // Handlers
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
  const handelDeleteOffer = (id) => {
    setSelectedProductId(id);
    setDeleteOfferToggle(true);
  };

  // Close menus when clicking outside
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch products when page changes
  useEffect(() => {
    dispatch(productThunk({ page, limit }));
  }, [dispatch, page]);

  return (
    <div className="overflow-hidden font-sans">
      <ToastContainer />

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteOfferToggle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#67676780] z-20 flex items-center justify-center p-2"
          >
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="w-full max-w-sm p-5 rounded-lg bg-white relative"
            >
              <button onClick={() => setDeleteOfferToggle(false)}>
                <img src={close} alt="close" className="mr-auto" />
              </button>

              <img src={deleteOffer} alt="delete" className="m-auto w-24" />
              <p className="text-center my-5 text-lg font-bold">حذف إعلان</p>
              <p className="text-[#444444] text-center leading-6 text-sm">
                هل أنت متأكد من أنك تريد حذف هذا الإعلان؟ لا يمكن التراجع عن هذا
                الإجراء.
              </p>

              <div className="flex justify-between mt-5">
                <button
                  className="px-4 py-1 rounded-md text-[#818181] border border-[#818181]"
                  onClick={() => setDeleteOfferToggle(false)}
                >
                  إلغاء
                </button>
                <button
                  className="px-4 py-1 rounded-md bg-[#BD4749] text-white"
                  onClick={() => {
                    dispatch(deleteProduct(selectedProductId));
                    dispatch(productThunk({ page, limit }));
                    setDeleteOfferToggle(false);
                  }}
                >
                  حذف
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 my-5">
          <h1 className="text-lg md:text-xl font-bold">الإعلانات</h1>
          <div className="relative w-full md:w-[40vw]">
            <input
              type="text"
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
            <img
              src={menuTable2}
              className="cursor-pointer w-8"
              alt=""
              onClick={handelViews}
            />
            {infoTable && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute p-2 rounded-md z-20 bg-white top-12 right-0 w-32 shadow"
              >
                <div
                  className="flex items-center text-xs gap-2 cursor-pointer"
                  onClick={handelShowDetails}
                >
                  <img src={views} alt="views" />
                  عرض/إخفاء
                  <img src={arrowLeft} alt="" width={6} />
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <img src={deleteIcon} alt="delete" />
                  حذف
                </div>
              </motion.div>
            )}

            {showDetails && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
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
                    {col === "image"
                      ? "الصورة"
                      : col === "title"
                      ? "العنوان"
                      : col === "location"
                      ? "المكان"
                      : col === "publisher"
                      ? "اسم الناشر"
                      : col === "price"
                      ? "السعر"
                      : col === "date"
                      ? "تاريخ النشر"
                      : "الإجراءات"}
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Desktop Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="hidden md:block p-4 bg-white rounded-tr-3xl rounded-tl-3xl overflow-x-auto"
        >
          <table className="font-medium w-full text-sm">
            <thead>
              <tr className="text-[#959595] text-sm">
                {visibleColumns.image && <th className="pb-4">الصورة</th>}
                {visibleColumns.title && <th className="pb-4">العنوان</th>}
                {visibleColumns.location && <th className="pb-4">المكان</th>}
                {visibleColumns.publisher && (
                  <th className="pb-4">اسم الناشر</th>
                )}
                {visibleColumns.price && <th className="pb-4">السعر</th>}
                {visibleColumns.date && <th className="pb-4">تاريخ النشر</th>}
                {visibleColumns.actions && <th className="pb-4">الإجراءات</th>}
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan="7">
                    <div className="flex justify-center items-center h-40">
                      <Spinner />
                    </div>
                  </td>
                </tr>
              ) : (
                products.length > 0 &&
                Array.isArray(products) &&
                products.map((product, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t hover:bg-[#adadad2c] border-[#eee]"
                  >
                    {visibleColumns.image && (
                      <td className="py-3">
                        <img
                          loading="lazy"
                          src={
                            product?.main_photos?.[0]
                              ? `${import.meta.env.VITE_API_BASE_URL}/uploads/images/${product.main_photos[0]}`
                              : profile
                          }
                          alt="product"
                          className="w-10 h-10 object-cover rounded"
                        />
                      </td>
                    )}
                    {visibleColumns.title && (
                      <td className="text-center">{product.name}</td>
                    )}
                    {visibleColumns.location && (
                      <td className="text-center">
                        {product.Governorate_name}-{product.city}
                      </td>
                    )}
                    {visibleColumns.publisher && (
                      <td className="text-center">مياو المياو</td>
                    )}
                    {visibleColumns.price && (
                      <td className="text-center">{product.price} ل.س</td>
                    )}
                    {visibleColumns.date && (
                      <td className="text-center">
                        <TimeAgo postDate={product.createdAt} />
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="text-center">
                        <div className="flex justify-center gap-2">
                          <Link to={product?._id}>
                            <img
                              src={detailsUser}
                              alt="details"
                              className="w-7"
                            />
                          </Link>
                          <img
                            src={deleteUser}
                            alt="delete"
                            className="w-7 cursor-pointer"
                            onClick={() => handelDeleteOffer(product._id)}
                          />
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Spinner />
            </div>
          ) : (
            products.length > 0 &&
            Array.isArray(products) &&
            products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="p-4 bg-white rounded-2xl shadow flex gap-3"
              >
                <img
                  src={
                    product?.main_photos?.[0]
                      ? `${import.meta.env.VITE_API_BASE_URL}/uploads/images/${product.main_photos[0]}`
                      : profile
                  }
                  alt="product"
                  loading="lazy"
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="font-bold text-sm line-clamp-1">
                      {product.name}
                    </h2>
                    <p className="text-xs text-gray-600">
                      {product.Governorate_name}-{product.city}
                    </p>
                    <p className="text-xs text-gray-400">
                      <TimeAgo postDate={product.createdAt} />
                    </p>
                  </div>
                  <p className="mt-1 font-semibold text-[#BD4749] text-sm">
                    {product.price} ل.س
                  </p>
                </div>
                <div className="flex flex-col justify-between items-center gap-2">
                  <Link to={product?._id}>
                    <img src={detailsUser} alt="details" className="w-6" />
                  </Link>
                  <img
                    src={deleteUser}
                    alt="delete"
                    className="w-6 cursor-pointer"
                    onClick={() => handelDeleteOffer(product._id)}
                  />
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={limit}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
};

export default Offers;
