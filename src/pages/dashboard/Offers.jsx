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
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "../../components/TimeAgo";

const Offers = () => {
  const [infoTable, setInfoTable] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();
  const { products = [] } = useSelector((state) => state.products);
  console.log(products)
  const [visibleColumns, setVisibleColumns] = useState({
    image: true,
    title: true,
    location: true,
    publisher: true,
    price: true,
    date: true,
    actions: true,
  });
  const [deleteOfferToggle, setDeleteOfferToggle] = useState(false);

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
  const handelDeleteOffer = () => {
    setDeleteOfferToggle(true);
  };
  return (
    <div className="overflow-hidden font-sans">
      {deleteOfferToggle ? (
        <div className="absolute w-[100vw] h-screen bg-[#67676780] z-20 translate-x-60">
          <div className="w-96 h-[74vh] p-5 rounded-lg bg-white absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link to={"/dashboard/offers"}>
              <img src={close} alt="" className="mr-auto" />
            </Link>
            <img src={deleteOffer} alt="" className="m-auto" />
            <p className="text-center my-5">حذف إعلان</p>
            <p className="text-[#444444] text-center leading-6">
              هل أنت متأكد من أنك تريد حذف هذا المستخدم؟ لا يمكن التراجع عن هذا
              الإجراء.
            </p>
            <div className="flex-between mt-5 font-normal">
              <button className="px-7 py-1 rounded-md text-[#818181] border-solid border-[1px] border-[#818181]">
                إلغاء
              </button>
              <button className="px-7 py-1 rounded-md bg-[#BD4749] text-white ">
                حذف
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
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
                    checked={visibleColumns.title}
                    onChange={() => handleColumnToggle("title")}
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
                      <img src={profile} alt="" width={50} />
                    </td>
                  )}
                  {visibleColumns.title && <td>{product.name}</td>}
                  {visibleColumns.location && (
                    <td>
                      {product.Governorate_name}-{product.city}
                    </td>
                  )}
                  {visibleColumns.publisher && <td>مياو المياو </td>}
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
                          alt=""
                          className="ml-2"
                          width={30}
                        />
                        <img
                          src={deleteUser}
                          alt=""
                          width={30}
                          className="cursor-pointer"
                          onClick={handelDeleteOffer}
                        />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
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

export default Offers;
