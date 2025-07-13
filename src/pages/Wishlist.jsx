import emptyWishlist from "../assets/images/emptyWishlist.svg";
const Wishlist = () => {
  return (
    <div className="container">
      <div className=" pt-20">
        <h1 className="font-normal text-[#2F2E41] text-[2rem]">
          إعلاناتك المفضلة
        </h1>
        <div className="flex-center flex-col gap-4 mb-6">
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
      </div>
    </div>
  );
};

export default Wishlist;
