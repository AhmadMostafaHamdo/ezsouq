import React, { useEffect, useRef, useState } from "react";
import arrowBtn from "../assets/images/arrow-btn.svg";
import cat from "../assets/images/cat.svg";
import { Link, useParams } from "react-router";
import arrowSend from "../assets/images/arrowSend.svg";
import { useDispatch, useSelector } from "react-redux";
import { productThunkById } from "../store/product/thunk/productThunkById";
import Card from "../components/website/Card";
import SortDropdown from "../components/website/SortDropdown";
const Commits = () => {
  const [activeSend, setActiveSend] = useState(false);
  const ref = useRef();
  const { id } = useParams();
  const { product } = useSelector((state) => state.products);
  const { _id } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    ref.current.scrollIntoView();
    dispatch(productThunkById(id));
  }, [dispatch, id]);
  return (
    <div ref={ref}>
      <div className="container pt-20">
        <div className="flex items-center gap-4 mb-4">
          <Link
            to="/"
            className="bg-white rounded-md py-3 px-4 shadow-[0px 4px 15.8px 0px #00000014]"
            aria-label="Navigate back"
          >
            <img src={arrowBtn} alt="Back arrow" />
          </Link>
          <h1 className="font-normal text-[#2F2E41] text-[1.5rem]">
            تعليقات هذا الإعلان
          </h1>
        </div>
        <Card {...product} />
        <p className="font-normal text-[1.5rem]">5 تعليقات</p>
        <div className="w-1/2">
          <SortDropdown />
          <div className="flex items-center gap-4">
            <img
              // src={`https://ezsouq.store/uploads/images/${product}`}
              src={cat}
              className="w-16 h-16"
              alt=""
            />
            <input
              onChange={(e) => setActiveSend(e.target.value)}
              type="text"
              placeholder="اكتب تعليقك..."
              className="p-3 rounded-[5px] w-[50vw] border-1 border-solid border-[#52516C] outline-none bg-white"
            />
            <button disabled={activeSend == ""}>
              <img
                src={arrowSend}
                alt=""
                className={activeSend ? "opacity-100" : "opacity-50"}
              />
            </button>
          </div>
          <div className="flex">
            <div>
              <img src={cat} alt="" />
            </div>
            <div>
              <span className="text-primary font-bold text-[1.25rem]">
                مياو المياو
              </span>
              <span className="font-normal text-[1rem] text-[#716D97]">
                منذ 3 ساعات
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commits;
