import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

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

const UserDetails = () => {
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("posts"); // "posts" or "contact"

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
    dispatch(getAllUsers({ page, limit: 6, search: searchQuery }));
  }, [dispatch, page, searchQuery]);

  const handleDeleteUser = (userId) => {
    if (!userId) return;
    dispatch(deleteUser(userId))
      .then(() =>
        dispatch(getAllUsers({ page, limit: 6, search: searchQuery }))
      )
      .finally(() => {
        setShowDeleteUser(false);
        setSelectedUserId(null);
      });
  };

  // Table columns
  const columns = [
    {
      key: "image",
      label: "الصورة",
      render: (user) => (
        <img
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
    <div>
      {/* Header */}
      <div className="flex flex-row items-start  gap-8">
        <div>
          <Heading title="حساب المستخدم" url="/dashboard/users" />
          <div>
            <p className="flex gap-2 text-[#5A5A5A] cursor-pointer">
              <img src={block} alt="" />
              حظر المستخدم
            </p>
            <p className="flex gap-2 text-[#FDBF18] cursor-pointer">
              <img src={start} alt="" />
              عرض التقييمات
            </p>

            <p className="flex gap-2 text-[#5A5A5A] cursor-pointer">
              <img src={report} alt="" />
              عرض الإبلاغات
            </p>
            <p className="flex gap-2 text-[#BD4749] cursor-pointer">
              <img src={deleteIcon} alt="" />
              حذف المستخدم
            </p>
          </div>
        </div>
        <ImgProfileWithButtons
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      {loadingDelete ? (
        <div className="mt-64 flex justify-center">
          <Spinner size={80} />
        </div>
      ) : (
        <>
          <ToastContainer />

          {/* Conditional rendering for tabs */}
          {activeTab === "contact" ? (
            <ContactInfo />
          ) : (
            <>
              {/* Search input */}
              <div className="flex-center gap-3 my-5">
                <input
                  type="text"
                  className="p-2 pr-7 rounded-md w-full border border-gray-300 text-sm"
                  placeholder="بحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block p-4 bg-white rounded-tr-3xl rounded-tl-3xl overflow-x-auto">
                <DataTable
                  data={productsById}
                  columns={columns}
                  loading={loading}
                />
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden">
                <MobileCards
                  data={productsById}
                  loading={loading}
                  renderCard={() => {}}
                />
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
        </>
      )}
    </div>
  );
};

export default UserDetails;
