import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CardSkeleton from "../../assets/sketlon/product";
import Card from "../website/Card";

const CategoryOrdered = ({ category }) => {
  const {
    products = [],
    loading,
    totalPages = 1,
  } = useSelector((state) => state.productsByCat);

  const dispatch = useDispatch();

  useEffect(() => {
    // TODO: Fetch products by category if needed
  }, [dispatch, category]);

  return (
    <div className="py-10">
      {/* Render product cards */}
      <div className="w-full flex flex-wrap gap-9 pl-4 py-10 md:pl-12 justify-start container">
        {loading && totalPages === 1 ? (
          Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          <>
            {products?.map((product) => (
              <Card key={product._id} {...product} />
            ))}

            {/* Show skeletons while loading additional pages */}
            {loading &&
              Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryOrdered;
