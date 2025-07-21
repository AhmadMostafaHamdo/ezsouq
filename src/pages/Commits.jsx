import React, { useEffect, useRef, useState } from "react";
import cat from "../assets/images/cat.svg";
import { Link, useParams } from "react-router";
import arrowSend from "../assets/images/arrowSend.svg";
import { useDispatch, useSelector } from "react-redux";
import { productThunkById } from "../store/product/thunk/productThunkById";
import Card from "../components/website/Card";
import SortDropdown from "../components/website/SortDropdown";
import Commit from "../components/website/commits/Commit";
import Heading from "../components/common/Heading";
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
      <div className="container pt-20 flex gap-8">
        <div>
          <Heading title=" تعليقات هذا الإعلان" />
          <Card {...product} />
        </div>
        <div className="mt-14">
          <p className="font-normal text-[1.5rem]">5 تعليقات</p>
          <div className="w-1/2">
            <SortDropdown />
            <div className="flex items-center gap-4 ">
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
            <Commit />
            <div className="mr-12">
              <Commit />
            </div>
            <hr className="my-10" />
            <Commit />
            <div className="mr-12">
              <Commit />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commits;
