import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { productsThunkForMe } from "../../store/product/thunk/productsThunkById";
import Card from "./Card";
import Spinner from "../../feedback/loading/Spinner";
import CardSkeleton from "../../assets/sketlon/product";

// MainProfile component displays user posts (products)
const MainProfile = React.memo(() => {
  const { productsById, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { id } = useParams();

  // Fetch products by user ID
  useEffect(() => {
    if (id) {
      dispatch(productsThunkForMe(id));
    }
  }, [dispatch, id]);
  return (
    <section className="container pb-10">
      {loading ? (
        <CardSkeleton />
      ) : (
        <div className="w-full flex justify-start  items-center gap-[2.25rem] pl-[1rem] md:pl-[3.187rem] flex-wrap">
          {productsById?.length > 0 ? (
            productsById.map((product, index) => (
              <Card {...product} key={product._id || index} />
            ))
          ) : (
            <p className="flex-center w-screen mt-10 text-[#808080b9]">
              لا توجد منشورات بعد
            </p>
          )}
        </div>
      )}
    </section>
  );
});

export default MainProfile;
