import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/website/Card";
import { productThunk } from "../store/product/thunk/productThunk";
import CardSkeleton from "../assets/sketlon/product";
import Heading from "../components/common/Heading";

const Newest = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    order: "desc",
    city: "",
    sortBy: "price",
    page: 1,
    limit: 8, // بتقدر تكبرها
  });

  const {
    products = [],
    totalPages,
    loading,
  } = useSelector((state) => state.products);

  // ✅ تحميل الصفحة الأولى
  useEffect(() => {
    dispatch(productThunk(filters));
  }, [dispatch, filters]);

  // ✅ دالة لتحميل المزيد
  const loadMore = useCallback(() => {
    if (!loading && filters.page < totalPages) {
      setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  }, [loading, filters.page, totalPages]);

  // ✅ Event للـ scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300 // قبل النهاية بـ 300px
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);
console.log(products[0])
  return (
    <div className="py-14">
      <Heading title='الرجوع'/>
      <div className="container flex-between flex-wrap gap-5">
        {products?.map((product) => (
          <Card key={product._id} {...product} />
        ))}
      </div>

      {/* ✅ مؤشر تحميل */}
      <div className="flex-center gap-8 mt-4 flex-wrap">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
};

export default Newest;
