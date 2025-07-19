import { useDispatch, useSelector } from "react-redux";
import emptyWishlist from "../assets/images/emptyWishlist.svg";
import { useEffect } from "react";
import { userThunkById } from "../store/users/thunk/userThunkById";
import { getAllWishes } from "../store/wishlist/thunk/getAllWishProduct";
import Card from "../components/website/Card";
const Wishlist = () => {
  const dispatch = useDispatch();
  const { products = [] } = useSelector((state) => state.wishlist);
  useEffect(() => {
    dispatch(getAllWishes());
  }, [dispatch]);
  return (
    <div className="container">
      <div className=" py-20">
        {products ? (
          <div className="flex-between flex-wrap gap-5">
         {   products.map((product) => <Card {...product} />)}
          </div>
        ) : (
          <>
            <h1 className="font-normal text-[#2F2E41] text-[1.5rem]">
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
              <button className="bg-primary text-white rounded-xl w-44 h-12">
                تصفح الإعلانات
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
