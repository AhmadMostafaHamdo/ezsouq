import React, { useEffect, useRef, useState } from "react";
import cat from "../assets/images/cat.svg";
import { useParams } from "react-router";
import arrowSend from "../assets/images/arrowSend.svg";
import { useDispatch, useSelector } from "react-redux";
import { productThunkById } from "../store/product/thunk/productThunkById";
import Card from "../components/website/Card";
import SortDropdown from "../components/website/SortDropdown";
import Commit from "../components/website/commits/Commit";
import Heading from "../components/common/Heading";
import { thunkAddCommit } from "../store/commits/thunk/thunkAddCommit";
import { getAllCommentsByIdThunk } from "../store/commits/thunk/getAllCommentsById";
import CommentSkeleton from "../assets/sketlon/CommentSketlon";

const Commits = () => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const ref = useRef();
  const { id } = useParams();
  const { product } = useSelector((state) => state.products);
  console.log(product)
  const { commentsByProductId, loading: commentsLoading } = useSelector(
    (state) => state.comments
  );

  const productComments = commentsByProductId?.[product?._id] || [];

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    const fetchData = async () => {
      try {
        await dispatch(productThunkById(id));
      } catch (err) {
        setError("Failed to fetch product data");
      }
    };
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (product?._id) {
      dispatch(getAllCommentsByIdThunk(product._id));
    }
  }, [dispatch, product?._id]);

  const handleSend = async () => {
    if (!comment.trim()) return;

    try {
      await dispatch(
        thunkAddCommit({
          product_id: product?._id,
          comment: comment,
        })
      );
      setComment("");
      // Refresh comments after adding new one
      dispatch(getAllCommentsByIdThunk(product?._id));
    } catch (err) {
      setError("Failed to add comment");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };
  return (
    <div ref={ref}>
      <div className="container pt-20 flex flex-col md:flex-row gap-8">
        <div>
          <Heading title="تعليقات هذا الإعلان" />
          <Card {...product} />
        </div>

        <div className="mt-8 md:mt-14 flex-1">
          <p className="font-normal text-[1.5rem]">
            {productComments.length} تعليقات
          </p>

          <div className="w-full">
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
                  className="p-3 rounded-[5px] w-full md:w-[40vw] border-1 border-solid border-[#52516C] outline-none bg-white"
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

            {commentsLoading ? (
              <>
                <CommentSkeleton />
                <CommentSkeleton />
              </>
            ) : productComments.length > 0 ? (
              productComments.map((item) => (
                <React.Fragment key={item._id}>
                  <Commit
                    comment={item.comments}
                    createdAt={item.createdAt}
                    user={item.user_id}
                  />
                  <hr className="my-6 w-full md:w-[40vw]" />
                </React.Fragment>
              ))
            ) : (
              <p className="text-gray-500">لا توجد تعليقات بعد</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commits;
