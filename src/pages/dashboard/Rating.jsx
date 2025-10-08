import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRateing } from "../../store/rating/thunk/getAllRating";
import { deleteRatedUser } from "../../store/rating/thunk/deleteRate";
import { Link } from "react-router-dom";

import Spinner from "../../feedback/loading/Spinner";

import profile from "../../assets/images/profileIcon.svg";
import deleteIcon from "../../assets/images/dashboard/deleteIcon.svg";
import eye from "../../assets/images/dashboard/viewsBlue.svg";
import { columnsRating } from "../../data/dashboard";
import Pagination from "../../components/dashoard/Pagination";

const Rating = () => {
  const dispatch = useDispatch();
  const { rate, loading, pagination } = useSelector((s) => s.rating);
  console.log(rate);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // === Fetch ratings when page changes ===
  useEffect(() => {
    dispatch(getAllRateing(page));
  }, [dispatch, page]);

  // === Delete a rating ===
  const handleDelete = (ratingId) => {
    console.log(ratingId);
    if (window.confirm("هل أنت متأكد أنك تريد حذف هذا التقييم؟")) {
      dispatch(deleteRatedUser(ratingId));
    }
  };

  // === Search filter ===
  const filtered = rate?.filter(
    (r) =>
      r?.name?.toLowerCase().includes(search.toLowerCase()) ||
      r?.email?.toLowerCase().includes(search.toLowerCase())
  );

  // === Pagination variables ===
  const currentPage = pagination?.page || 1;
  const totalPages = pagination?.totalPages || 1;
  const totalItems = pagination?.totalCount || 0;

  return (
    <div className="container mx-auto">
      {/* === Header with search === */}
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
          <img
            src={profile}
            alt="أيقونة البحث"
            className="absolute top-1/2 -translate-y-1/2 right-2 w-4 h-4"
          />
        </div>
      </div>

      {/* === Ratings Table === */}
      <div className="hidden sm:block p-3 bg-white rounded-tr-3xl rounded-tl-3xl shadow-md">
        <table className="w-full text-sm font-medium bg-white">
          <thead>
            <tr className="text-[#959595] text-sm border-b">
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
                  className="border-t border-[#eee] hover:bg-gray-50 transition"
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
                      {/* View details */}
                      <Link to={`/dashboard/rating/${r?._id}`}>
                        <img src={eye} alt="عرض التقييم" width={20} />
                      </Link>

                      {/* Delete rating */}
                      <button
                        onClick={() => handleDelete(r?._id)}
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
                <td colSpan={6} className="text-center py-5 text-gray-500">
                  لا يوجد تقييمات
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* === Pagination Component === */}
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
    </div>
  );
};

export default Rating;
