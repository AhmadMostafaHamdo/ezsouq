import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRateing } from "../../store/rating/thunk/getAllRating";
import { deleteRatedUser } from "../../store/rating/thunk/deleteRate";
import { Link } from "react-router-dom";

// Components
import Spinner from "../../feedback/loading/Spinner";
import Pagination from "../../components/dashoard/Pagination";
import DeleteOrBanModal from "../../components/dashoard/DeleteOrBanModal";

// Images
import profile from "../../assets/images/profileIcon.svg";
import deleteIcon from "../../assets/images/dashboard/deleteIcon.svg";
import eye from "../../assets/images/dashboard/viewsBlue.svg";
import { columnsRating } from "../../data/dashboard";

const Rating = () => {
  const dispatch = useDispatch();
  const { rate, loading, pagination } = useSelector((s) => s.rating);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch ratings when page changes
  useEffect(() => {
    dispatch(getAllRateing(page));
  }, [dispatch, page]);

  // Open delete modal
  const openDeleteModal = (ratingId) => {
    setSelectedId(ratingId);
    setShowModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!selectedId) return;
    try {
      setDeleteLoading(true);
      await dispatch(deleteRatedUser(selectedId)).unwrap();
      setShowModal(false);
      setSelectedId(null);
      dispatch(getAllRateing(page)); // Refresh list
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Filter ratings
  const filtered = rate?.filter(
    (r) =>
      r?.name?.toLowerCase().includes(search.toLowerCase()) ||
      r?.email?.toLowerCase().includes(search.toLowerCase())
  );

  const currentPage = pagination?.page || 1;
  const totalPages = pagination?.totalPages || 1;
  const totalItems = pagination?.totalCount || 0;

  return (
    <div className="container mx-auto">
      {/* Header with search */}
      <div className="flex flex-col lg:flex-row items-center justify-between my-5 w-full lg:w-[60vw] gap-3">
        <h1 className="text-xl font-bold">التقييمات</h1>
        <div className="relative w-full lg:w-[40vw]">
          <input
            type="text"
            placeholder="بحث..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 pr-8 rounded-md border border-gray-300 text-sm outline-none"
            aria-label="حقل البحث"
          />
        </div>
      </div>

      {/* TABLE VIEW (desktop) */}
      <div className="hidden sm:block p-3 bg-white rounded-tr-3xl rounded-tl-3xl shadow-md">
        <table className="w-full text-sm font-medium bg-white">
          <thead>
            <tr className="text-[#959595] border-[#eee] text-sm border-b">
              {columnsRating.map((c) => (
                <th key={c.key} className="px-2 py-3 text-center">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-10 text-center">
                  <Spinner />
                </td>
              </tr>
            ) : filtered?.length > 0 ? (
              filtered.map((r, i) => (
                <tr
                  key={r._id || i}
                  className="border-t border-[#eee] hover:bg-[#adadad2c] transition"
                >
                  <td className="py-3 text-center">
                    <img
                      src={r?.avatar || profile}
                      alt="صورة المستخدم"
                      className="w-10 h-10 rounded-full object-cover mx-auto"
                    />
                  </td>
                  <td className="py-3 text-center">{r?.name || "-"}</td>
                  <td className="py-3 text-center">{r?.email || "-"}</td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Link to={`/dashboard/rating/${r?._id}`}>
                        <img src={eye} alt="عرض التقييم" width={20} />
                      </Link>
                      <button
                        onClick={() => openDeleteModal(r?._id)}
                        className="bg-[#FEE2E2] hover:bg-[#FCA5A5] p-1.5 rounded-full transition"
                        title="حذف التقييم"
                      >
                        <img src={deleteIcon} alt="حذف التقييم" width={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-5 text-[#8080809f]">
                  لا يوجد تقييمات
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={10}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </div>

      {/* CARD VIEW (mobile) */}
      <div className="block sm:hidden mt-4">
        {loading ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : filtered?.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filtered.map((r, i) => (
              <div
                key={r._id || i}
                className="bg-[#F9FAFB] p-4 rounded-xl shadow-sm border"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={r?.avatar || profile}
                    alt="صورة المستخدم"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-[#808080e0]">
                      {r?.name || "مستخدم مجهول"}
                    </p>
                    <p className="text-[#808080cc] text-sm">
                      {r?.email || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 mt-3">
                  <Link to={`/dashboard/rating/${r?._id}`}>
                    <img src={eye} alt="عرض" width={20} />
                  </Link>
                  <button
                    onClick={() => openDeleteModal(r?._id)}
                    className="bg-[#FEE2E2] hover:bg-[#FCA5A5] p-2 rounded-full transition"
                  >
                    <img src={deleteIcon} alt="حذف" width={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[#808080a1] py-5">لا يوجد تقييمات</p>
        )}

        <div className="flex justify-center mt-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={10}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </div>

      {/* Delete Modal */}
      {showModal && (
        <DeleteOrBanModal
          type="delete"
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};

export default Rating;
