import { useDispatch, useSelector } from "react-redux";
import CardSkeleton from "../../assets/sketlon/product";
import { useEffect, useState, useCallback } from "react";
import Card from "../website/Card";
import { thunkGetProductByCat } from "../../store/getProductsByCat/thunk/thunkGetProductByCat";
import { resetProducts } from "../../store/getProductsByCat/getProductByCatSlice";
import Heading from "../common/Heading";

const CategoryFilter = ({ category = null }) => {
  const {
    products = [],
    loading,
    totalPages = 1,
    currentPage = 1,
  } = useSelector((state) => state.productsByCat);

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  // 🧹 تنظيف وتحميل أول صفحة عند تغيير الكاتيجوري أو عند عدم وجوده
  useEffect(() => {
    dispatch(resetProducts());
    setPage(1);
    dispatch(thunkGetProductByCat({ category, page: 1 }));
  }, [dispatch, category]);

  // 📥 تحميل المزيد عند التمرير
  const loadMore = useCallback(() => {
    if (!loading && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  }, [loading, page, totalPages]);

  // 📡 طلب المنتجات عند تغير الصفحة
  useEffect(() => {
    if (page > 1) {
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
      <div className="w-full flex flex-wrap gap-9 pl-4 md:pl-12 justify-start container mb-6">
        {products.length === 0 && loading ? (
          Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          <>
            {Array.isArray(products) &&
              products.length > 0 &&
              products.map((product) => (
                <Card key={product._id} {...product} />
              ))}

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
