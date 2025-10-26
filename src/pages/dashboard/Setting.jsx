import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

// Components
import Pagination from "../../components/dashoard/Pagination";
import Spinner from "../../feedback/loading/Spinner";
import DeleteOrBanModal from "../../components/dashoard/DeleteOrBanModal";

// Images
import search from "../../assets/images/search.svg";
import addIcon from "../../assets/images/add.svg";
import closeIcon from "../../assets/images/close.svg";
import updateIcon from "../../assets/images/updateIcon.svg";
import deleteIcon from "../../assets/images/dashboard/deleteUser.svg";

// Redux Thunks
import { addGovernorate } from "../../store/governorates/thunk/addGovernorate";
import { updateGovernorate } from "../../store/governorates/thunk/handleUpdateGovernorate";
import { thunkGovernorates } from "../../store/governorates/thunk/thunkGovernorates";
import { deleteGovernorate } from "../../store/governorates/thunk/deleteGovernorate";

const Offers = () => {
  const dispatch = useDispatch();
  const { governorates, loading } = useSelector((state) => state.governorates);

  // Spinner overlay for add/update/delete actions
  const [actionLoading, setActionLoading] = useState(false);

  // Search & Pagination
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 3;

  // Modal state
  const [modal, setModal] = useState({ show: false, type: "add" });
  const [currentGov, setCurrentGov] = useState({
    name: "",
    cities: [""],
    id: null,
  });
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

  // Load governorates on mount
  useEffect(() => {
    dispatch(thunkGovernorates());
  }, [dispatch]);

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(inputValue);
      setPage(1);
    }, 300);
    return () => clearTimeout(timeout);
  }, [inputValue]);

  // Filter logic
  const filteredGovernorates = useMemo(() => {
    if (!Array.isArray(governorates)) return [];
    if (!searchTerm.trim()) return governorates;
    const term = searchTerm.toLowerCase();
    return governorates.filter(
      (gov) =>
        gov.name.toLowerCase().includes(term) ||
        gov.cities.some((city) => city.toLowerCase().includes(term))
    );
  }, [searchTerm, governorates]);

  // Pagination logic
  const totalPages = Math.ceil((filteredGovernorates?.length || 0) / limit);
  const paginatedGovernorates = filteredGovernorates?.slice(
    (page - 1) * limit,
    page * limit
  );

  // City Handlers
  const handleCityChange = (index, value) => {
    const newCities = [...currentGov.cities];
    newCities[index] = value;
    setCurrentGov((prev) => ({ ...prev, cities: newCities }));
  };
  const addCity = () =>
    setCurrentGov((prev) => ({ ...prev, cities: [...prev.cities, ""] }));
  const removeCity = (index) =>
    setCurrentGov((prev) => ({
      ...prev,
      cities: prev.cities.filter((_, i) => i !== index),
    }));

  // Add Modal
  const openAddModal = () => {
    setCurrentGov({ name: "", cities: [""] });
    setError("");
    setModal({ show: true, type: "add" });
  };

  // Update Modal
  const openUpdateModal = (gov) => {
    setCurrentGov({
      name: gov.name,
      cities: gov.cities.length ? gov.cities : [""],
      id: gov._id,
    });
    setError("");
    setModal({ show: true, type: "update" });
  };

  // Delete Modal
  const openDeleteModal = (id) => setDeleteModal({ show: true, id });

  // Confirm Delete
  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await dispatch(deleteGovernorate(deleteModal.id)).unwrap();
      toast.success("تم حذف المحافظة بنجاح", {
        position: "top-center",
        autoClose: 1500,
      });
      await dispatch(thunkGovernorates());
      setDeleteModal({ show: false, id: null });
      if (paginatedGovernorates.length === 1 && page > 1) setPage(page - 1);
    } catch (error) {
      console.error("Error deleting governorate:", error);
      toast.error("حدث خطأ أثناء الحذف");
    } finally {
      setActionLoading(false);
    }
  };

  // Save (Add / Update)
  const saveGovernorate = async () => {
    const trimmedName = currentGov.name.trim();
    const filteredCities = currentGov.cities
      .map((c) => c.trim())
      .filter(Boolean);

    if (!trimmedName) return setError("يرجى إدخال اسم المحافظة");
    if (filteredCities.length === 0)
      return setError("يجب إدخال مدينة واحدة على الأقل");

    const data = { name: trimmedName, cities: filteredCities };

    setActionLoading(true);
    try {
      if (modal.type === "add") {
        await dispatch(addGovernorate({ data })).unwrap();
        toast.success("تمت إضافة المحافظة بنجاح", {
          position: "top-center",
          autoClose: 1500,
        });
      } else {
        await dispatch(
          updateGovernorate({ gov_id: currentGov.id, data })
        ).unwrap();
        toast.success("تم تحديث المحافظة بنجاح", {
          position: "top-center",
          autoClose: 1500,
        });
      }

      setModal({ show: false, type: "add" });
      setError("");
      await dispatch(thunkGovernorates());
    } catch (err) {
      console.error("Error saving governorate:", err);
      toast.error("حدث خطأ أثناء الحفظ");
    } finally {
      setActionLoading(false);
    }
  };

  // Spinner during initial load
  if (loading)
    return (
      <div className="mt-48">
        <Spinner />
      </div>
    );

  return (
    <div className="overflow-hidden font-sans h-[60vh] relative">
      <ToastContainer />

      {/* 🔹 Spinner Overlay during add/update/delete */}
      {actionLoading && (
        <div className="fixed inset-0 bg-[#00000060] z-50 flex justify-center items-center">
          <Spinner />
        </div>
      )}

      {/* Add / Update Modal */}
      {modal.show && (
        <div className="fixed inset-0 bg-[#67676780] z-30 flex justify-center items-center p-2">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl relative overflow-auto max-h-[90vh]">
            <button
              onClick={() => setModal({ show: false, type: "add" })}
              className="absolute top-4 right-4"
            >
              <img
                src={closeIcon}
                alt="إغلاق النافذة"
                width={20}
                loading="lazy"
              />
            </button>

            <h2 className="text-lg font-bold text-center mb-4">
              {modal.type === "add" ? "إضافة محافظة جديدة" : "تعديل المحافظة"}
            </h2>

            {error && (
              <p className="text-[#ff0000bb] text-sm mb-2 text-center">
                {error}
              </p>
            )}

            {/* Governorate Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                اسم المحافظة
              </label>
              <input
                type="text"
                value={currentGov.name}
                onChange={(e) =>
                  setCurrentGov((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="أدخل اسم المحافظة"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>

            {/* Cities */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                المدن التابعة لها
              </label>
              <div className="space-y-2 max-h-44 p-1 overflow-auto">
                {currentGov.cities.map((city, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-stretch gap-2"
                  >
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => handleCityChange(idx, e.target.value)}
                      placeholder={`أدخل اسم المدينة ${idx + 1}`}
                      className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    />
                    {currentGov.cities.length > 1 && (
                      <button
                        onClick={() => removeCity(idx)}
                        className="px-2 py-1 bg-[#EF4444] text-white rounded-md hover:bg-[#DC2626]"
                      >
                        حذف
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addCity}
                className="text-[#4F46E5] mt-2 text-sm hover:underline"
              >
                + إضافة مدينة جديدة
              </button>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
              <button
                onClick={() => setModal({ show: false, type: "add" })}
                className="w-full sm:w-1/2 px-4 py-2 rounded-md border border-gray-400 text-gray-600 hover:bg-gray-100"
              >
                إلغاء
              </button>
              <button
                onClick={saveGovernorate}
                className="w-full sm:w-1/2 px-4 py-2 rounded-md bg-[#4F46E5] text-white hover:bg-[#4338CA]"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal.show && (
        <DeleteOrBanModal
          type="governorate"
          onConfirm={handleDelete}
          onCancel={() => setDeleteModal({ show: false, id: null })}
        />
      )}

      {/* Header & Search */}
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center my-5 gap-2">
          <h1 className="text-xl font-bold text-center sm:text-left text-[#1F2937]">
            إدارة المحافظات
          </h1>

          <div className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                className="p-2 pr-8 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                placeholder="ابحث عن مدينة أو محافظة..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <img
                src={search}
                className="absolute top-1/2 -translate-y-1/2 right-2"
                alt="بحث"
                loading="lazy"
              />
            </div>

            <button
              className="bg-[#4F46E5] text-white p-2 rounded-md flex items-center hover:bg-[#4338CA]"
              onClick={openAddModal}
            >
              إضافة محافظة
              <img src={addIcon} className="mx-2" alt="إضافة" loading="lazy" />
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block p-4 bg-white rounded-t-3xl shadow">
          <table className="w-full">
            <thead>
              <tr className="text-[#6B7280] text-sm sm:text-base">
                <th className="pb-4">المحافظة</th>
                <th className="pb-4">المدن التابعة لها</th>
                <th className="pb-4">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedGovernorates?.length > 0 ? (
                paginatedGovernorates.map((gov) => (
                  <tr
                    key={gov._id}
                    className="border-t hover:bg-[#adadad2c] border-gray-300"
                  >
                    <td className="text-center py-2">{gov.name}</td>
                    <td className="text-center py-2">
                      {gov.cities.length > 5
                        ? gov.cities.slice(0, 4).join(" - ") + " ..."
                        : gov.cities.join(" - ")}
                    </td>
                    <td className="text-center py-2">
                      <div className="flex justify-center gap-2">
                        <img
                          src={updateIcon}
                          alt="تعديل"
                          width={25}
                          className="cursor-pointer"
                          loading="lazy"
                          onClick={() => openUpdateModal(gov)}
                        />
                        <img
                          src={deleteIcon}
                          alt="حذف"
                          width={25}
                          className="cursor-pointer"
                          loading="lazy"
                          onClick={() => openDeleteModal(gov._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    لا توجد نتائج مطابقة للبحث
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={filteredGovernorates.length}
              itemsPerPage={limit}
              onPageChange={(p) => setPage(p)}
            />
          )}
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden grid grid-cols-1 gap-4 mt-4">
          {paginatedGovernorates?.length > 0 ? (
            paginatedGovernorates.map((gov) => (
              <div
                key={gov._id}
                className="bg-white p-4 rounded-xl shadow flex flex-col gap-2"
              >
                <h2 className="font-bold text-lg text-[#111827]">{gov.name}</h2>
                <p className="text-sm text-gray-600">
                  المدن:{" "}
                  {gov.cities.length > 5
                    ? gov.cities.slice(0, 4).join(" - ") + " ..."
                    : gov.cities.join(" - ")}
                </p>

                <div className="flex justify-end gap-3 mt-2">
                  <button
                    onClick={() => openUpdateModal(gov)}
                    className="text-[#4F46E5] underline text-sm"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => openDeleteModal(gov._id)}
                    className="text-[#EF4444] underline text-sm"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 font-medium">
              لا توجد نتائج مطابقة للبحث
            </p>
          )}

          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={filteredGovernorates.length}
                itemsPerPage={limit}
                onPageChange={(p) => setPage(p)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Offers;
