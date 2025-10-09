import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

// 🧩 Components
import Pagination from "../../components/dashoard/Pagination";
import Spinner from "../../feedback/loading/Spinner";

// 🖼️ Images
import search from "../../assets/images/search.svg";
import menuTable2 from "../../assets/images/dashboard/menuTable2.svg";
import addIcon from "../../assets/images/add.svg";
import closeIcon from "../../assets/images/close.svg";
import updateIcon from "../../assets/images/updateIcon.svg";
import deleteIcon from "../../assets/images/dashboard/deleteUser.svg";

// ⚙️ Redux Thunks
import { addGovernorate } from "../../store/governorates/thunk/addGovernorate";
import { updateGovernorate } from "../../store/governorates/thunk/handleUpdateGovernorate";
import { thunkGovernorates } from "../../store/governorates/thunk/thunkGovernorates";

const Offers = () => {
  const dispatch = useDispatch();
  const { governorates, loading } = useSelector((state) => state.governorates);

  // 🧠 Search states (input vs actual filter term)
  const [inputValue, setInputValue] = useState(""); // user typing
  const [searchTerm, setSearchTerm] = useState(""); // debounced term

  // 📄 Pagination
  const [page, setPage] = useState(1);
  const limit = 3;

  // 🪟 Modal state
  const [modal, setModal] = useState({ show: false, type: "add" }); // type: add / update
  const [currentGov, setCurrentGov] = useState({
    name: "",
    cities: [""],
    id: null,
  });
  const [error, setError] = useState("");

  // 🚀 Fetch governorates on mount
  useEffect(() => {
    dispatch(thunkGovernorates());
  }, [dispatch]);

  // 🕒 Debounce search input (wait 300ms after typing stops)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(inputValue);
      setPage(1);
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  // 🔍 Filter governorates by name or city
  const filteredGovernorates = useMemo(() => {
    if (!searchTerm.trim()) return governorates;
    const term = searchTerm.toLowerCase();
    return governorates.filter(
      (gov) =>
        gov.name.toLowerCase().includes(term) ||
        gov.cities.some((city) => city.toLowerCase().includes(term))
    );
  }, [searchTerm, governorates]);

  // 📑 Pagination logic
  const totalPages = Math.ceil((filteredGovernorates?.length || 0) / limit);
  const paginatedGovernorates =
    Array.isArray(filteredGovernorates) &&
    filteredGovernorates.length > 0 &&
    filteredGovernorates?.slice((page - 1) * limit, page * limit);

  // 🏙️ Handle city change
  const handleCityChange = (index, value) => {
    const newCities = [...currentGov.cities];
    newCities[index] = value;
    setCurrentGov((prev) => ({ ...prev, cities: newCities }));
  };

  // ➕ Add / Remove city
  const addCity = () =>
    setCurrentGov((prev) => ({ ...prev, cities: [...prev.cities, ""] }));
  const removeCity = (index) =>
    setCurrentGov((prev) => ({
      ...prev,
      cities: prev.cities.filter((_, i) => i !== index),
    }));

  // 🟢 Add Modal
  const openAddModal = () => {
    setCurrentGov({ name: "", cities: [""] });
    setError("");
    setModal({ show: true, type: "add" });
  };

  // 🟡 Update Modal
  const openUpdateModal = (gov) => {
    setCurrentGov({
      name: gov.name,
      cities: gov.cities.length ? gov.cities : [""],
      id: gov._id,
    });
    setError("");
    setModal({ show: true, type: "update" });
  };

  // 💾 Save governorate (add/update)
  const saveGovernorate = () => {
    const trimmedName = currentGov.name.trim();
    const filteredCities = currentGov.cities
      .map((c) => c.trim())
      .filter((c) => c);

    if (!trimmedName) return setError("يرجى إدخال اسم المحافظة");
    if (filteredCities.length === 0)
      return setError("يجب إدخال مدينة واحدة على الأقل");

    const data = { name: trimmedName, cities: filteredCities };

    if (modal.type === "add") dispatch(addGovernorate({ data }));
    else if (modal.type === "update")
      dispatch(updateGovernorate({ gov_id: currentGov.id, data }));

    setModal({ show: false, type: "add" });
    setError("");
  };

  if (loading) return <Spinner />;

  return (
    <div className="overflow-hidden font-sans bg-[#F5F5F5] min-h-screen">
      <ToastContainer />

      {/* 🪟 Modal for Add / Update Governorate */}
      {modal.show && (
        <div className="fixed inset-0 bg-[#67676780] z-30 flex justify-center items-center p-2">
          <div
            className="w-full max-w-md bg-[#FFFFFF] rounded-2xl p-6 shadow-2xl relative overflow-auto max-h-[90vh]"
            alt="نافذة تعديل أو إضافة محافظة"
          >
            <button
              onClick={() => setModal({ show: false, type: "add" })}
              className="absolute top-4 right-4"
            >
              <img src={closeIcon} alt="إغلاق النافذة" width={20} />
            </button>

            <h2 className="text-lg font-bold text-center mb-4">
              {modal.type === "add" ? "إضافة محافظة جديدة" : "تعديل المحافظة"}
            </h2>

            {error && (
              <p className="text-red-600 text-sm mb-2 text-center font-medium">
                {error}
              </p>
            )}

            {/* 🏙️ Governorate name */}
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
                alt="إدخال اسم المحافظة"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>

            {/* 🏘️ Cities list */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                المدن التابعة لها
              </label>
              <div className="space-y-2 max-h-44 overflow-auto">
                {currentGov.cities.map((city, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                  >
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => handleCityChange(idx, e.target.value)}
                      placeholder={`أدخل اسم المدينة ${idx + 1}`}
                      alt={`إدخال اسم المدينة رقم ${idx + 1}`}
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

            {/* 🧭 Modal actions */}
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

      {/* 🔍 Header + Search + Add button */}
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
                alt="حقل البحث عن المحافظات والمدن"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <img
                src={search}
                className="absolute top-1/2 -translate-y-1/2 right-2"
                alt="رمز البحث"
              />
            </div>

            <div className="flex items-center gap-2">
              <img src={menuTable2} alt="عرض القائمة" width={35} />
              <button
                className="bg-[#4F46E5] text-white p-2 rounded-md flex items-center hover:bg-[#4338CA]"
                onClick={openAddModal}
              >
                إضافة محافظة
                <img src={addIcon} className="mx-2" alt="رمز الإضافة" />
              </button>
            </div>
          </div>
        </div>

        {/* 📋 Governorates Table */}
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
                  <tr key={gov._id} className="border-t border-gray-300">
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
                          alt="تعديل المحافظة"
                          width={25}
                          className="cursor-pointer"
                          onClick={() => openUpdateModal(gov)}
                        />
                        <img
                          src={deleteIcon}
                          alt="حذف المحافظة"
                          width={25}
                          className="cursor-pointer"
                          onClick={() => alert("هنا دالة الحذف لاحقاً")}
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

          {/* 📄 Pagination */}
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
      </div>
    </div>
  );
};

export default Offers;
