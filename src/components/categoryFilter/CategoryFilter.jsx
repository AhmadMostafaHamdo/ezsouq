import { useDispatch, useSelector } from "react-redux";
import { thunkGetProductByCat } from "../../store/getProductsByCat/thunk/thunkGetProductByCat";
import CardSkeleton from "../../assets/sketlon/product";
import { useEffect } from "react";
import Card from "../website/Card";

const CategoryFilter = ({ category }) => {
  const {
    products = [],
    loading,
    totalPages = 1,
  } = useSelector((state) => state.productsByCat);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkGetProductByCat(category));
  }, [dispatch]);
  return (
    <div className="py-10">
      {/* عرض المنتجات */}
      <div className="w-full flex flex-wrap gap-9 pl-4 py-10 md:pl-12 justify-start container">
        {loading && totalPages == 1 ? (
          Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          <>
            {products?.map((product) => (
              <Card key={product._id} {...product} />
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

export default CategoryFilter;
