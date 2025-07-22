import { useState } from "react";
import close from "../../../assets/images/close.svg";
import startRating from "../../../assets/images/startRating.svg";
import filledStar from "../../../assets/images/filledStar.svg"; // نجمة ممتلئة عند التحديد
import { Link } from "react-router";

const Rating = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="fixed z-10 top-0 left-0 w-full h-screen  shadow-[0px 4px 15.8px 0px #00000026] bg-[#23193E]/[.57] backdrop-blur-[20]">
      <div className="absolute z-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-auto bg-white rounded-[2rem] shadow-[0px 4px 15.8px 0px #00000026]">
        <div className="flex flex-col items-center px-3 py-5 font-normal opacity-[1]">
          <Link to="/profile" className="self-start">
            <img src={close} alt="close" />
          </Link>
          <h1 className="leading-9">قيّم تجربتك مع المعلن</h1>
          <p>(اضغط لتحديد عدد النجوم)</p>

          <div className="flex-center gap-2 mt-5 mb-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <img
                key={index}
                src={index < rating ? filledStar : startRating}
                alt={`star-${index + 1}`}
                className="w-8 h-8 cursor-pointer"
                onClick={() => setRating(index + 1)}
              />
            ))}
          </div>

          {rating > 0 && (
            <div className="bg-[#DEDCFF] px-2 rounded-lg w-fit mb-4 mx-auto">
              {rating === 1
                ? "سيء"
                : rating === 2
                ? "مقبول"
                : rating === 3
                ? "جيد"
                : rating === 4
                ? "جيد جدًا"
                : "ممتاز"}
            </div>
          )}

          <div className="flex-center gap-6">
            <p className="text-[.9rem]">أخبرنا لماذا اخترت هذا التقييم</p>
            <span className="text-[#B1ADFF] tetx-[.8rem]">اختياري</span>
          </div>
          <textarea className="p-2 max-h-20 min-h-20 w-full my-5 outline-none border-solid border-2 border-[#B9B5FF]"></textarea>
          <div className="flex-between gap-4">
            <button className="bg-primary text-white rounded-xl w-28 p-1">
              إرسال التقييم
            </button>
            <button className="border-solid border-[1px] border-[#B1ADFF] text-primary rounded-xl w-28 p-1">
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
