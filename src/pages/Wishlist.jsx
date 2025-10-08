import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWishes } from "../store/wishlist/thunk/getAllWishProduct";
import { likeToggleWishlistThunk } from "../store/wishlist/thunk/likeToggleWishlistThunk";
import Card from "../components/website/Card";
import Spinner from "../feedback/loading/Spinner";
import Heading from "../components/common/Heading";
import emptyWishlist from "../assets/images/emptyWishlist.svg";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  const { products = [], loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    ref.current.scrollIntoView();
    dispatch(getAllWishes());
  }, [dispatch]);

  const handleToggleFavorite = (_id) => {
    // ✅ Toggle المفضلة ثم إعادة جلب wishlist تلقائيًا
    dispatch(likeToggleWishlistThunk(_id));
  };

  return (
    <div className="container pt-14" ref={ref}>
      <Heading title={"الرجوع للرئيسية"} />
      <div className="pb-20 pt-2">
        {loading ? (
          <div className="mt-32">
            <Spinner size={100} />
          </div>
        ) : Array.isArray(products) && products.length > 0 ? (
          <div className="flex flex-wrap gap-5">
            {products.map((product) => {
              return (
                <Card
                  key={product._id}
                  {...product}
                  onToggleFavorite={() => handleToggleFavorite(product._id)}
                />
              );
            })}
          </div>
        ) : (
          <div className="-mt-6">
            <h1 className="font-normal text-[#2F2E41] translate-y-2 text-[1.5rem]">
              إعلاناتك المفضلة
            </h1>
            <div className="flex-center flex-col gap-4 mb-10">
              <img src={emptyWishlist} className="h-48" alt="" />
              <p className="font-semibold text-[#3F3D56] text-[1.5rem]">
                لم تقم بعد بإضافة أي إعلان إلى المفضلة
              </p>
              <p className="text-[#A8A3FF] text-[1.25rem] font-semibold text-center">
                تصفح الإعلانات واضغط على القلب لحفظ ما
                <br /> يعجبك هنا!
              </p>
              <Link
                to="/"
                className="bg-primary text-white flex-center rounded-xl w-44 h-12"
              >
                تصفح الإعلانات
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
