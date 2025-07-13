import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productThunk } from "../store/product/thunk/productThunk";
import Card from "../components/website/Card";

const Cars = () => {
  const [filters, setFilters] = useState({
    category: "سيارات", 
    totalPages: 1
    
  });
  const {
    products = [],
    loading,
    totalPages = 1,
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productThunk(filters));
  }, [dispatch, filters]);
  return (
    <div className="py-10">
      {/* عرض المنتجات */}
      <div className="w-full flex flex-wrap gap-9 pl-4 py-10 md:pl-12 justify-start container">
        {loading && totalPages == 1 ? (
          Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          <>
            {products.map((product) => (
              <Card key={product.id} {...product} />
            ))}
            {loading &&
              filters.page > 1 &&
              Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
          </>
        )}
      </div>
    </div>
  );
};

export default Cars;
