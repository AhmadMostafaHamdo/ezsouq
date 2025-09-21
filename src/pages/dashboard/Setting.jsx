import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Pagination from "../../components/dashoard/Pagination";
// صور
import search from "../../assets/images/search.svg";
import menuTable from "../../assets/images/dashboard/menuTable.svg";
import menuTable2 from "../../assets/images/dashboard/menuTable2.svg";
import add from "../../assets/images/add.svg";
import close from "../../assets/images/close.svg";
import updateIcon from "../../assets/images/updateIcon.svg";
import deleteUser from "../../assets/images/dashboard/deleteUser.svg";
import { addGovernorate } from "../../store/governorates/thunk/addGovernorate";
import { updateGovernorate } from "../../store/governorates/thunk/handleUpdateGovernorate";
import { thunkGovernorates } from "../../store/governorates/thunk/thunkGovernorates";

const Offers = () => {
  const dispatch = useDispatch();
  const { governorates } = useSelector((state) => state.governorates);

  const [page, setPage] = useState(1);
  const limit = 3;

  // ---- إضافة محافظة ----
  const [showAddGovernorateModal, setShowAddGovernorateModal] = useState(false);
  const [governorate, setGovernorate] = useState("");
  const [cities, setCities] = useState([""]);

  // ---- تعديل محافظة ----
  const [showUpdateGovernorateModal, setShowUpdateGovernorateModal] =
    useState(false);
  const [updateGovernorateData, setUpdateGovernorateData] = useState({
    id: null,
    name: "",
    cities: [""],
  });

  const menuRef = useRef(null);

  // إغلاق أي قائمة منبثقة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // ...
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ------------------- إضافة محافظة -------------------
  const addCity = () => setCities([...cities, ""]);
  const handleCityChange = (index, value) => {
    const newCities = [...cities];
    newCities[index] = value;
    setCities(newCities);
  };
  const removeCity = (index) => setCities(cities.filter((_, i) => i !== index));

  const handleSaveGovernorate = () => {
    if (!governorate.trim()) {
      alert("يرجى إدخال اسم المحافظة");
      return;
    }
    const data = { governorate, cities: cities.filter((c) => c.trim() !== "") };
    dispatch(addGovernorate({ data }));
    setGovernorate("");
    setCities([""]);
    setShowAddGovernorateModal(false);
  };

  // ------------------- تعديل محافظة -------------------
  const handleOpenUpdateModal = (gov) => {
    setUpdateGovernorateData({
      id: gov._id,
      name: gov.name,
      cities: gov.cities || [""],
    });
    setShowUpdateGovernorateModal(true);
  };

  const handleUpdateCityChange = (index, value) => {
    const newCities = [...updateGovernorateData.cities];
    newCities[index] = value;
    setUpdateGovernorateData((prev) => ({ ...prev, cities: newCities }));
  };

  const addUpdateCity = () => {
    setUpdateGovernorateData((prev) => ({
      ...prev,
      cities: [...prev.cities, ""],
    }));
  };

  const removeUpdateCity = (index) => {
    setUpdateGovernorateData((prev) => ({
      ...prev,
      cities: prev.cities.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    dispatch(thunkGovernorates());
  }, [dispatch]);

  const handleSaveUpdateGovernorate = () => {
    if (!updateGovernorateData.name.trim()) {
      alert("يرجى إدخال اسم المحافظة");
      return;
    }
    dispatch(
      updateGovernorate({
        gov_id: updateGovernorateData.id,
        data: {
          name: updateGovernorateData.name,
          cities: updateGovernorateData.cities.filter((c) => c.trim() !== ""),
        },
      })
    );
    setShowUpdateGovernorateModal(false);
  };

  // ------------------- عرض المحافظات -------------------
  const totalItems = governorates?.length || 0;
  const totalPages = Math.ceil(totalItems / limit);
  const paginatedGovernorates = governorates?.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <div className="overflow-hidden font-sans">
      <ToastContainer />

      {/* مودال إضافة محافظة */}
      {showAddGovernorateModal && (
        <div className="fixed inset-0 bg-[#67676780] z-30 flex justify-center items-center">
          <div className="w-[500px] bg-white rounded-2xl p-6 shadow relative">
            <button
              onClick={() => setShowAddGovernorateModal(false)}
              className="absolute top-4 right-4"
            >
              <img src={close} alt="close" width={20} />
            </button>
            <h2 className="text-lg font-bold text-center mb-6">
              إضافة محافظة جديدة
            </h2>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                اسم المحافظة
              </label>
              <input
                type="text"
                value={governorate}
                onChange={(e) => setGovernorate(e.target.value)}
                placeholder="أدخل اسم المحافظة"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                المدن التابعة لها
              </label>
              {cities.map((city, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => handleCityChange(index, e.target.value)}
                    placeholder={`أدخل اسم المدينة ${index + 1}`}
                    className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {cities.length > 1 && (
                    <button
                      onClick={() => removeCity(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      حذف
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addCity}
                className="text-primary mt-2 text-sm hover:underline"
              >
                + إضافة مدينة جديدة
              </button>
            </div>
            <div className="flex justify-between gap-3 mt-6">
              <button
                onClick={() => setShowAddGovernorateModal(false)}
                className="w-1/2 px-4 py-2 rounded-md border border-gray-400 text-gray-600 hover:bg-gray-100"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveGovernorate}
                className="w-1/2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال تعديل محافظة */}
      {showUpdateGovernorateModal && (
        <div className="fixed inset-0 bg-[#67676780] z-30 flex justify-center items-center">
          <div className="w-[500px] bg-white rounded-2xl p-6 shadow relative">
            <button
              onClick={() => setShowUpdateGovernorateModal(false)}
              className="absolute top-4 right-4"
            >
              <img src={close} alt="close" width={20} />
            </button>
            <h2 className="text-lg font-bold text-center mb-6">
              تعديل المحافظة
            </h2>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                اسم المحافظة
              </label>
              <input
                type="text"
                value={updateGovernorateData.name}
                onChange={(e) =>
                  setUpdateGovernorateData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="أدخل اسم المحافظة"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                المدن التابعة لها
              </label>
              <div className="overflow-auto h-44">
                {updateGovernorateData.cities.map((city, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) =>
                        handleUpdateCityChange(index, e.target.value)
                      }
                      placeholder={`أدخل اسم المدينة ${index + 1}`}
                      className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {updateGovernorateData.cities.length > 1 && (
                      <button
                        onClick={() => removeUpdateCity(index)}
                        className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        حذف
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addUpdateCity}
                className="text-primary mt-2 text-sm hover:underline"
              >
                + إضافة مدينة جديدة
              </button>
            </div>
            <div className="flex justify-between gap-3 mt-6">
              <button
                onClick={() => setShowUpdateGovernorateModal(false)}
                className="w-1/2 px-4 py-2 rounded-md border border-gray-400 text-gray-600 hover:bg-gray-100"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveUpdateGovernorate}
                className="w-1/2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* العنوان + البحث + القائمة */}
      <div className="container">
        <div className="flex justify-between items-center my-5">
          <h1 className="text-xl font-bold">إدارة المحافظات</h1>
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
          <div className="flex items-center gap-2 relative" ref={menuRef}>
            <img src={menuTable} alt="" width={40} />
            <img
              src={menuTable2}
              className="cursor-pointer"
              alt=""
              width={40}
            />
            <button
              className="bg-primary text-white w-fit p-[6px] rounded-md flex justify-between items-center"
              onClick={() => setShowAddGovernorateModal(true)}
            >
              إضافة محافظة
              <img src={add} className="mx-2" />
            </button>
          </div>
        </div>

        {/* جدول المحافظات */}
        <div className="p-6 bg-white rounded-tr-3xl rounded-tl-3xl">
          <table className="font-medium w-full">
            <thead>
              <tr className="text-[#959595]">
                <th className="pb-4">المحافظة</th>
                <th className="pb-4">المدن التابعة لها</th>
                <th className="pb-4">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="text-[.9rem]">
              {paginatedGovernorates?.map((gov) => (
                <tr className="border-t border-[#eee]" key={gov._id}>
                  <td className="text-center py-2">{gov.name}</td>
                  <td className="text-center py-2">
                    {gov.cities.length > 5
                      ? gov.cities?.slice(0,4).join(" - ")+" ......"
                      : gov.cities?.join(" - ")}
                  </td>
                  <td className="text-center py-2">
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src={updateIcon}
                        alt="update"
                        width={25}
                        className="cursor-pointer"
                        onClick={() => handleOpenUpdateModal(gov)}
                      />
                      <img
                        src={deleteUser}
                        alt="delete"
                        width={25}
                        className="cursor-pointer"
                        onClick={() => alert("هنا تعمل دالة الحذف لاحقًا")}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalItems}
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
