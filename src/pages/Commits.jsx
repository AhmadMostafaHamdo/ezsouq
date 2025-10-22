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
import { getRepliesByCommentId } from "../store/commits/thunk/getRepliesByCommentId";

const Commits = () => {
  const [comment, setComment] = useState("");
  const [page, setPage] = useState(1);
  const observerRef = useRef();
  const topPage = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product } = useSelector((state) => state.products);
  const {
    commentsByProductId,
    loading: commentsLoading,
    replies,
  } = useSelector((state) => state.comments);
  const { user } = useSelector((state) => state.auth);
  const token = Cookies.get("token");
  const { id: userId } = token ? jwtDecode(token) : {};

  // ✅ Extract comments with meta
  const productComments = commentsByProductId?.[product?._id]?.comments || [];
  const totalComments =
    commentsByProductId?.[product?._id]?.total || productComments.length;
  const totalPages = commentsByProductId?.[product?._id]?.pages || 1;
  const currentPage = commentsByProductId?.[product?._id]?.page || 1;
  useEffect(() => {
    topPage.current?.scrollIntoView();
  }, []);
  // Fetch product
  useEffect(() => {
    if (!id) return;
    dispatch(productThunkById(id));
  }, [dispatch, id]);

  // Fetch first page of comments
  useEffect(() => {
    if (product?._id) {
      setPage(1);
      dispatch(getAllCommentsByIdThunk({ product_id: product._id, page: 1 }));
    }
  }, [dispatch, product?._id]);

  // Intersection observer for infinite scroll
  const lastCommentRef = (node) => {
    if (commentsLoading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        currentPage < totalPages &&
        !commentsLoading
      ) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  };

  // Load next page
  useEffect(() => {
    if (page > 1 && product?._id && currentPage < totalPages) {
      dispatch(getAllCommentsByIdThunk({ product_id: product._id, page }));
    }
  }, [page, product?._id, currentPage, totalPages, dispatch]);

  // Handle adding comment
  const handleSend = async () => {
    if (!comment.trim()) return;

    try {
      await dispatch(
        thunkAddCommit({ product_id: product._id, comment })
      ).unwrap();

      setComment("");
      dispatch(getAllCommentsByIdThunk({ product_id: product._id, page: 1 }));
      toast.success("تم إضافة التعليق بنجاح");
    } catch (err) {
      toast.error(err || "حدث خطأ أثناء إضافة التعليق");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // Load replies for a specific comment
  const handleToggleReplies = (commentId) => {
    if (!replies[commentId]) {
      dispatch(getRepliesByCommentId(commentId));
    }
  };

  return (
    <div className="container pt-20" ref={topPage}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col md:flex-row gap-8">
        <div>
          <Heading title="تعليقات هذا الإعلان" />
          <Card {...product} />
        </div>

        <div className="flex-1 mt-8 md:mt-14">
          <p className="font-normal text-[1.5rem]">{totalComments} تعليقات</p>

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
            {commentsLoading && page === 1 ? (
              <CommentSkeleton />
            ) : productComments.length > 0 ? (
              <>
                {productComments.map((item, index) => {
                  if (index === productComments.length - 1) {
                    return (
                      <div ref={lastCommentRef} key={item._id}>
                        <Commit
                          setArrow={() => handleToggleReplies(item._id)}
                          comment={item.comments}
                          createdAt={item.createdAt}
                          user={item.user}
                          id={item._id}
                          productId={product._id}
                        />
                      </div>
                    );
                  } else {
                    return (
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
                  }
                })}
              </>
            ) : (
              <div className="text-center text-gray-500">
                <p>لا توجد تعليقات بعد</p>
                <img src={commentEmpty} className="mx-auto mt-4" alt="" />
              </div>
            )}

            {commentsLoading && page > 1 && <CommentSkeleton />}

            <hr className="my-3 w-full md:w-[40vw]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commits;
