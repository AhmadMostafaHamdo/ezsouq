import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import CardSkeleton from "../../assets/sketlon/product";
import Card from "../website/Card";
import Heading from "../common/Heading";
import { thunkGetProductByCat } from "../../store/getProductsByCat/thunk/thunkGetProductByCat";
import { resetProducts } from "../../store/getProductsByCat/getProductByCatSlice";

const CategoryFilter = ({ category = null }) => {
  const {
    products = [],
    loading,
    totalPages = 1,
  } = useSelector((state) => state.productsByCat);

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  // Load first page and reset when category changes
  useEffect(() => {
    dispatch(resetProducts());
    setPage(1);
    dispatch(thunkGetProductByCat({ category, page: 1 }));
  }, [dispatch, category]);

  // Load more when scrolled near bottom
  const loadMore = useCallback(() => {
    if (!loading && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  }, [loading, page, totalPages]);

  // Fetch products when page changes
  useEffect(() => {
    if (page > 1) {
      dispatch(thunkGetProductByCat({ category, page }));
    }
  }, [dispatch, category, page]);

  // Handle infinite scroll
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
      {/* Heading (Return / Back) */}
      <div className="mt-14">
        <Heading title="الرجوع" />
      </div>

      <div className="w-full flex flex-wrap gap-9 pl-4 md:pl-12 justify-start container mb-6">
        {/* Loading Skeletons when data is loading */}
        {products.length === 0 && loading ? (
          Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          <>
            {/* Render products */}
            {Array.isArray(products) &&
              products.length > 0 &&
              products.map((product) => (
                <Card key={product._id} {...product} />
              ))}

            {/* Show skeletons when loading more pages */}
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
