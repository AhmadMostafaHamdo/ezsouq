import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRateing } from "../../store/rating/thunk/getAllRating";
import { Link } from "react-router-dom";

// Components
// Spinner component for loading state
import Spinner from "../../feedback/loading/Spinner";
// Pagination component for switching pages
import Pagination from "../../components/dashoard/Pagination";

// Images
import profile from "../../assets/images/profileIcon.svg";
import eye from "../../assets/images/dashboard/viewsBlue.svg";
import { columnsRating } from "../../data/dashboard";

const Rating = () => {
  const dispatch = useDispatch();
  const { rate, loading, pagination } = useSelector((s) => s.rating);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Fetch ratings when the page changes
  useEffect(() => {
    dispatch(getAllRateing(page));
  }, [dispatch, page]);

  // Filter ratings by name or email
  const filtered = rate?.filter(
    (r) =>
      r?.name?.toLowerCase().includes(search.toLowerCase()) ||
      r?.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination data
  const currentPage = pagination?.page || 1;
  const totalPages = pagination?.totalPages || 1;
  const totalItems = pagination?.totalCount || 0;

  return (
    <div className="container mx-auto">
      {/* Header with search input */}
      <div className="flex flex-col lg:flex-row items-center justify-between my-5 w-full lg:w-[60vw] gap-3">
        <h1 className="text-xl font-bold">التقييمات</h1>

        {/* Search field */}
        <div className="relative w-full lg:w-[40vw]">
          <input
            type="text"
            placeholder="بحث..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 pr-8 rounded-md border border-gray-300 text-sm outline-none"
            aria-label="Search field"
          />
        </div>
      </div>

      {/* Desktop table view */}
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
            {/* Loading state */}
            {loading ? (
              <tr>
                <td colSpan={5} className="py-10 text-center">
                  <Spinner />
                </td>
              </tr>
            ) : filtered?.length > 0 ? (
              /* Render table items */
              filtered.map((r, i) => (
                <tr
                  key={r._id || i}
                  className="border-t border-[#eee] hover:bg-[#adadad2c] transition"
                >
                  {/* Avatar */}
                  <td className="py-3 text-center">
                    <img
                      src={r?.avatar || profile}
                      alt="User avatar"
                      className="w-10 h-10 rounded-full object-cover mx-auto"
                    />
                  </td>

                  {/* Name */}
                  <td className="py-3 text-center">{r?.name || "-"}</td>

                  {/* Email */}
                  <td className="py-3 text-center">{r?.email || "-"}</td>

                  {/* Actions */}
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Link to={`/dashboard/rating/${r?._id}`}>
                        <img src={eye} alt="View rating" width={20} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              /* No results state */
              <tr>
                <td colSpan={6} className="text-center py-5 text-[#8080809f]">
                  لا يوجد تقييمات
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
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

      {/* Mobile card view */}
      <div className="block sm:hidden mt-4">
        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : filtered?.length > 0 ? (
          /* List of rating cards */
          <div className="grid grid-cols-1 gap-4">
            {filtered.map((r, i) => (
              <div
                key={r._id || i}
                className="bg-[#F9FAFB] p-4 rounded-xl shadow-sm border"
              >
                {/* Header section */}
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={r?.avatar || profile}
                    alt="User avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold text-[#808080e0]">
                      {r?.name || "Unknown user"}
                    </p>

                    <p className="text-[#808080cc] text-sm">
                      {r?.email || "-"}
                    </p>
                  </div>
                </div>

                {/* View button */}
                <div className="flex items-center justify-end gap-4 mt-3">
                  <Link to={`/dashboard/rating/${r?._id}`}>
                    <img src={eye} alt="View" width={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* No results message */
          <p className="text-center text-[#808080a1] py-5">لا يوجد تقييمات</p>
        )}

        {/* Pagination */}
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
    </div>
  );
};

export default Rating;
