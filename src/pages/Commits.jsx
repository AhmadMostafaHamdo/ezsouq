import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import cat from "../assets/images/cat.svg";
import arrowSend from "../assets/images/arrowSend.svg";
import commentEmpty from "../assets/images/commentEmpty.svg";

import Card from "../components/website/Card";
import SortDropdown from "../components/website/SortDropdown";
import Commit from "../components/website/commits/Commit";
import Heading from "../components/common/Heading";
import CommentSkeleton from "../assets/sketlon/CommentSketlon";

import { productThunkById } from "../store/product/thunk/productThunkById";
import { getAllCommentsByIdThunk } from "../store/commits/thunk/getAllCommentsById";
import { thunkAddCommit } from "../store/commits/thunk/thunkAddCommit";

const Commits = () => {
  const [comment, setComment] = useState("");
  const [arrow, setArrow] = useState(false);
  const ref = useRef();

  const { id } = useParams();
  const dispatch = useDispatch();

  const { product } = useSelector((state) => state.products);
  const { commentsByProductId, loading: commentsLoading } = useSelector(
    (state) => state.comments
  );
  const { user } = useSelector((state) => state.auth);

  const token = Cookies.get("token");
  const { id: userId } = token ? jwtDecode(token) : {};

  const productComments = commentsByProductId?.[product?._id] || [];

  // Fetch product
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    if (!id) return;

    dispatch(productThunkById(id));
  }, [dispatch, id]);

  // Fetch comments for product
  useEffect(() => {
    if (product?._id) {
      dispatch(getAllCommentsByIdThunk(product._id));
    }
  }, [dispatch, product?._id]);

  // Handle adding comment
  const handleSend = async () => {
    if (!comment.trim()) return;

    try {
      await dispatch(
        thunkAddCommit({ product_id: product._id, comment })
      ).unwrap();

      setComment("");
      dispatch(getAllCommentsByIdThunk(product._id));
      toast.success("تم إضافة التعليق بنجاح");
    } catch (err) {
      toast.error(err || "حدث خطأ أثناء إضافة التعليق");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div ref={ref} className="container pt-20">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col md:flex-row gap-8">
        <div>
          <Heading title="تعليقات هذا الإعلان" />
          <Card {...product} />
        </div>

        <div className="flex-1 mt-8 md:mt-14">
          <p className="font-normal text-[1.5rem]">
            {productComments.length} تعليقات
          </p>

          <SortDropdown />

          {user && (
            <div className="flex items-center gap-4 mb-8">
              <img
                src={cat}
                className="w-16 h-16 rounded-full"
                alt="User profile"
              />
              <input
                value={comment}
                onKeyDown={handleKeyPress}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="اكتب تعليقك..."
                className="p-3 rounded-[5px] w-full md:w-[40vw] border border-gray-400 outline-none bg-white"
              />
              <button
                onClick={handleSend}
                disabled={!comment.trim()}
                className={`p-2 ${
                  comment.trim() ? "opacity-100" : "opacity-50"
                }`}
              >
                <img src={arrowSend} alt="Send comment" />
              </button>
            </div>
          )}

          <div className="relative">
            {commentsLoading ? (
              <CommentSkeleton />
            ) : productComments.length > 0 ? (
              productComments.map((item) => (
                <Commit
                  key={item._id}
                  setArrow={setArrow}
                  comment={item.comments}
                  createdAt={item.createdAt}
                  user={item.user_id}
                  id={item._id}
                  productId={product._id}
                />
              ))
            ) : (
              <div className="text-center text-gray-500">
                <p>لا توجد تعليقات بعد</p>
                <img src={commentEmpty} className="mx-auto mt-4" alt="" />
              </div>
            )}

            <hr className="my-3 w-full md:w-[40vw]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commits;
