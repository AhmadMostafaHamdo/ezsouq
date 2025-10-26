import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Card from "../components/website/Card";
import SortDropdown from "../components/website/SortDropdown";
import Commit from "../components/website/commits/Commit";
import Heading from "../components/common/Heading";
import CommentSkeleton from "../assets/sketlon/CommentSketlon";
import noCommits from "../assets/images/noCommits.svg";
import { productThunkById } from "../store/product/thunk/productThunkById";
import { getAllCommentsByIdThunk } from "../store/commits/thunk/getAllCommentsById";
import { thunkAddCommit } from "../store/commits/thunk/thunkAddCommit";
import { getRepliesByCommentId } from "../store/commits/thunk/getRepliesByCommentId";

const Commits = () => {
  // ------------------- State & Refs -------------------
  const [comment, setComment] = useState("");
  const [page, setPage] = useState(1);
  const observerRef = useRef();
  const topPage = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  // ------------------- Redux Selectors -------------------
  const { product } = useSelector((state) => state.products);
  const {
    commentsByProductId,
    loading: commentsLoading,
    replies,
  } = useSelector((state) => state.comments);
  const { user } = useSelector((state) => state.auth);

  // ------------------- Token Decode -------------------
  const token = Cookies.get("token");
  const { id: userId } = token ? jwtDecode(token) : {};
  // ------------------- Comments Meta -------------------
  const productComments = commentsByProductId?.[product?._id]?.comments || [];
  const totalComments =
    commentsByProductId?.[product?._id]?.total || productComments.length;
  const totalPages = commentsByProductId?.[product?._id]?.pages || 1;
  const currentPage = commentsByProductId?.[product?._id]?.page || 1;

  // ------------------- Scroll to top -------------------
  useEffect(() => {
    topPage.current?.scrollIntoView();
  }, []);

  // ------------------- Fetch Product -------------------
  useEffect(() => {
    if (id) dispatch(productThunkById(id));
  }, [dispatch, id]);

  // ------------------- Fetch Initial Comments -------------------
  useEffect(() => {
    if (product?._id) {
      setPage(1);
      dispatch(getAllCommentsByIdThunk({ product_id: product._id, page: 1 }));
    }
  }, [dispatch, product?._id]);

  // ------------------- Infinite Scroll -------------------
  const lastCommentRef = (node) => {
    if (commentsLoading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      const isVisible = entries[0].isIntersecting;
      if (isVisible && currentPage < totalPages && !commentsLoading) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  };

  // ------------------- Load Next Page -------------------
  useEffect(() => {
    if (page > 1 && product?._id && currentPage < totalPages) {
      dispatch(getAllCommentsByIdThunk({ product_id: product._id, page }));
    }
  }, [page, product?._id, currentPage, totalPages, dispatch]);

  // ------------------- Add New Comment -------------------
  const handleSend = async () => {
    if (!comment.trim()) return;

    try {
      await dispatch(
        thunkAddCommit({ product_id: product._id, comment })
      ).unwrap();
      setComment("");
      dispatch(getAllCommentsByIdThunk({ product_id: product._id, page: 1 }));
      toast.success("تمت إضافة التعليق بنجاح");
    } catch (err) {
      toast.error(err || "An error occurred while adding the comment");
    }
  };

  // ------------------- Send on Enter key -------------------
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // ------------------- Load Replies -------------------
  const handleToggleReplies = (commentId) => {
    if (!replies[commentId]) {
      dispatch(getRepliesByCommentId(commentId));
    }
  };
  // ------------------- JSX -------------------
  return (
    <div className="container pt-16" ref={topPage}>
      <Heading title="تعليقات هذا الإعلان" />
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Card */}
        <div>
          <Card {...product} />
        </div>

        {/* Comments Section */}
        <div className="flex-1 mt-8 md:mt-14">
          {/* Total Comments */}
          <p className="font-normal text-[1.5rem] text-[#050505]">
            {totalComments} تعليقات
          </p>

          {/* Sorting Dropdown */}
          <SortDropdown />

          {/* Input Field for Adding Comment */}
          {user && (
            <div className="flex items-center gap-4 mb-8">
              {/* Comment Input */}
              <input
                value={comment}
                onKeyDown={handleKeyPress}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="اكتب تعليقك..."
                className="p-3 rounded-[5px] w-full md:w-[40vw] border border-[#CCD0D5] outline-none bg-[#FFFFFF] text-[#050505]"
              />

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={!comment.trim()}
                className={`px-4 py-2 rounded-md bg-[#1877F2] text-[#FFFFFF] transition ${
                  comment.trim()
                    ? "opacity-100 hover:bg-[#166FE5]"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                إرسال
              </button>
            </div>
          )}

          {/* Comments List */}
          <div className="relative">
            {commentsLoading && page === 1 ? (
              <CommentSkeleton />
            ) : productComments.length > 0 ? (
              <>
                {productComments.map((item, index) => {
                  const isLast = index === productComments.length - 1;
                  const commentComponent = (
                    <Commit
                      key={item._id}
                      setArrow={() => handleToggleReplies(item._id)}
                      comment={item.comments}
                      createdAt={item.createdAt}
                      user={item.user}
                      id={item._id}
                      productId={product._id}
                    />
                  );
                  return isLast ? (
                    <div ref={lastCommentRef} key={item._id}>
                      {commentComponent}
                    </div>
                  ) : (
                    commentComponent
                  );
                })}
              </>
            ) : (
              <div className=" text-[#808080] py-8 flex-col flex-center md:w-[60vw]">
                <p className="mb-5 -mt-10">
                  لا توجد تعليقات بعد. كن أول من يشارك رأيه!
                </p>
                <img src={noCommits} alt="لا ي تعليقات" width={200} />
              </div>
            )}

            {commentsLoading && page > 1 && <CommentSkeleton />}
            <hr className="my-3 w-full md:w-[40vw] border-[#CCD0D5]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commits;
