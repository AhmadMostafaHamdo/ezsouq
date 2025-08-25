import React, { useState, useRef, useEffect } from "react";
import detailsUser from "../../assets/images/dashboard/detailsUser.svg";
import deleteUser from "../../assets/images/dashboard/deleteUser.svg";
import profile from "../../assets/images/profileIcon.svg";
import search from "../../assets/images/search.svg";
import views from "../../assets/images/views.svg";
import deleteIcon from "../../assets/images/dashboard/deleteIcon.svg";
import arrowLeft from "../../assets/images/dashboard/arrowLeftTable.svg";
import arrowRight from "../../assets/images/dashboard/arrowRightTable.svg";
import menuTable from "../../assets/images/dashboard/menuTable.svg";
import menuTable2 from "../../assets/images/dashboard/menuTable2.svg";
import deleteOffer from "../../assets/images/dashboard/deleteOffer.svg";
import close from "../../assets/images/close.svg";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "../../components/TimeAgo";
import { productThunk } from "../../store/product/thunk/productThunk";
import { deleteProduct } from "../../store/product/thunk/deleteProduct";

const Offers = () => {
  const [infoTable, setInfoTable] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [deleteOfferToggle, setDeleteOfferToggle] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const dispatch = useDispatch();
  const {
    products = [],
    totalPages = 1,
    currentPage = 1,
  } = useSelector((state) => state.products);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // جلب أول بيانات عند التحميل
  useEffect(() => {
    dispatch(productThunk({ page: 1, limit: 6 }));
  }, [dispatch]);

  return (
    <div className="overflow-hidden font-sans">
      {/* مودال الحذف */}
      {deleteOfferToggle && (
        <div className="fixed inset-0 bg-[#67676780] z-20 flex-center">
          <div className="w-96 h-[74vh] p-5 rounded-lg bg-white relative">
            <button onClick={() => setDeleteOfferToggle(false)}>
              <img src={close} alt="close" className="mr-auto" />
            </button>
            <img src={deleteOffer} alt="delete" className="m-auto" />
            <p className="text-center my-5 text-lg font-bold">حذف إعلان</p>
            <p className="text-[#444444] text-center leading-6">
              هل أنت متأكد من أنك تريد حذف هذا الإعلان؟ لا يمكن التراجع عن هذا
              الإجراء.
            </p>
            <div className="flex-between mt-5">
              <button
                className="px-7 py-1 rounded-md text-[#818181] border border-[#818181]"
                onClick={() => setDeleteOfferToggle(false)}
              >
                إلغاء
              </button>
              <button
                className="px-7 py-1 rounded-md bg-[#BD4749] text-white"
                onClick={() => {
                  dispatch(deleteProduct(selectedProductId));
                  setDeleteOfferToggle(false);
                }}
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        {/* العنوان + البحث + القائمة */}
        <div className="flex-between my-5 w-[60vw]">
          <h1 className="text-xl font-bold">الإعلانات</h1>
          <div className="relative">
            <input
              type="text"
              className="p-1 pr-7 rounded-md w-[40vw] border border-gray-300"
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
                  <img src={views} alt="views" />
                  عرض/إخفاء
                  <img src={arrowLeft} alt="" width={6} />
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <img src={deleteIcon} alt="delete" />
                  حذف
                </div>
              </div>
            )}
            {showDetails && (
              <div
                className="absolute rounded-md w-[160px] top-[7.3rem] right-16 bg-white p-2 shadow z-30"
                ref={detailsRef}
              >
                {Object.keys(visibleColumns).map((col) => (
                  <div
                    key={col}
                    className="text-[.8rem] mb-3 flex items-center"
                  >
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
              </div>
            )}
          </div>
        </div>

        {/* جدول المنتجات */}
        <div className="p-6 bg-white rounded-tr-3xl rounded-tl-3xl">
          <table className="font-medium w-full">
            <thead>
              <tr className="text-[#959595]">
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
            <tbody className="text-[.8rem]">
              {products?.map((product, index) => (
                <tr className="border-t border-[#eee]" key={index}>
                  {visibleColumns.image && (
                    <td className="py-4">
                      <img
                        src={
                          product?.main_photos?.[0]
                            ? `https://api.ezsouq.store/uploads/images/${product.main_photos[0]}`
                            : profile
                        }
                        alt="product"
                        width={40}
                      />
                    </td>
                  )}
                  {visibleColumns.title && <td>{product.name}</td>}
                  {visibleColumns.location && (
                    <td>
                      {product.Governorate_name}-{product.city}
                    </td>
                  )}
                  {visibleColumns.publisher && <td>مياو المياو</td>}
                  {visibleColumns.price && <td>{product.price}</td>}
                  {visibleColumns.date && (
                    <td>
                      <TimeAgo postDate={product.createdAt} />
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td>
                      <div className="flex items-center justify-center">
                        <img
                          src={detailsUser}
                          alt="details"
                          className="ml-2"
                          width={30}
                        />
                        <img
                          src={deleteUser}
                          alt="delete"
                          width={30}
                          className="cursor-pointer"
                          onClick={() => handelDeleteOffer(product._id)}
                        />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex-between text-[#959595] mt-3">
            <p>
              عرض {products?.length} من {totalPages * (products?.length || 6)}
            </p>
            <div className="flex-center gap-2">
              {currentPage > 1 && (
                <img
                  src={arrowRight}
                  alt="prev"
                  className="cursor-pointer"
                  onClick={() =>
                    dispatch(productThunk({ page: currentPage - 1, limit: 6 }))
                  }
                />
              )}
              {Array.from({ length: totalPages }, (_, i) => (
                <span
                  key={i}
                  className={`cursor-pointer ${
                    currentPage === i + 1 ? "font-bold" : ""
                  }`}
                  onClick={() =>
                    dispatch(productThunk({ page: i + 1, limit: 6 }))
                  }
                >
                  {i + 1}
                </span>
              ))}
              {currentPage < totalPages && (
                <img
                  src={arrowLeft}
                  alt="next"
                  className="cursor-pointer"
                  onClick={() =>
                    dispatch(productThunk({ page: currentPage + 1, limit: 6 }))
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
