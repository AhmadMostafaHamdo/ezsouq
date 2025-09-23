import { useDispatch, useSelector } from "react-redux";
import CardSkeleton from "../../assets/sketlon/product";
import { useEffect, useState, useCallback } from "react";
import Card from "../website/Card";
import { thunkGetProductByCat } from "../../store/getProductsByCat/thunk/thunkGetProductByCat";
import { resetProducts } from "../../store/getProductsByCat/getProductByCatSlice";
import Heading from "../common/Heading";

const CategoryFilter = ({ category }) => {
  const {
    products = [],
    loading,
    totalPages = 1,
    currentPage = 1,
  } = useSelector((state) => state.productsByCat);

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  // 🧹 تنظيف عند تغيير الكاتيجوري
  useEffect(() => {
    if (category) {
      dispatch(resetProducts());
      setPage(1);
      dispatch(thunkGetProductByCat({ category, page: 1 }));
    }
  }, [dispatch, category]);

  // 📥 تحميل المزيد
  const loadMore = useCallback(() => {
    if (!loading && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  }, [loading, page, totalPages]);

  // 📡 طلب المنتجات عند تغير الصفحة
  useEffect(() => {
    if (category && page > 1) {
      dispatch(thunkGetProductByCat({ category, page }));
    }
  }, [dispatch, category, page]);

  // 🎯 Scroll Event
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  return (
    <div className="py-1">
      <Heading title="الرجوع" />
      {/* عرض المنتجات */}
      <div className="w-full flex flex-wrap gap-9 pl-4  md:pl-12 justify-start container mb-6">
        {/* ✅ Skeleton عند أول تحميل */}
        {products.length === 0 && loading ? (
          Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          <>
            {Array.isArray(products) &&
              products.length > 0 &&
              products.map((product) => (
                <Card key={product._id} {...product} />
              ))}

            {/* ✅ Skeleton عند تحميل المزيد */}
            {loading &&
              page > 1 &&
              Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
