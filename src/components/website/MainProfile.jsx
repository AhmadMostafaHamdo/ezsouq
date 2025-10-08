import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { productsThunkForMe } from "../../store/product/thunk/productsThunkById";
import Card from "./Card";
import Spinner from "../../feedback/loading/Spinner";

// MainProfile component displays user posts (products)
const MainProfile = React.memo(() => {
  const { productsById ,loading} = useSelector((state) => state.products);
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
        <Spinner />
      ) : (
        <div className="w-full flex justify-start md:justify-evenly items-center gap-[2.25rem] pl-[1rem] md:pl-[3.187rem] flex-wrap">
          {productsById?.length > 0 ? (
            productsById.map((product, index) => (
              <Card {...product} key={product._id || index} />
            ))
          ) : (
            <p className="text-center text-gray-500">لا توجد منشورات بعد</p>
          )}
        </div>
      )}
    </section>
  );
});

export default MainProfile;
