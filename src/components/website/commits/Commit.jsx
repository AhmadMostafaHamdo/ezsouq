import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import cat from "../../../assets/images/cat.svg";
import arrowTopCommit from "../../../assets/images/arrowTopCommit.svg";
import arrowBottomCommit from "../../../assets/images/arrowBottomCommit.svg";
import replayCommit from "../../../assets/images/replayCommit.svg";
import iconSettingUser from "../../../assets/images/dashboard/iconSettingUser.svg";
import deleteIcon from "../../../assets/images/dashboard/deleteIcon.svg";
import updatedIcon from "../../../assets/images/updatedIcon.svg";
import TimeAgo from "../../TimeAgo";

import { deleteComment } from "../../../store/commits/thunk/deleteCommit";
import { updateComment } from "../../../store/commits/thunk/updateComment";
import { getAllCommentsByIdThunk } from "../../../store/commits/thunk/getAllCommentsById";
import { thunkReplayCommit } from "../../../store/commits/thunk/replayComment";
import { getRepliesByCommentId } from "../../../store/commits/thunk/getRepliesByCommentId";

const Commit = ({
  comment,
  createdAt,
  user,
  setArrow,
  id,
  productId,
  depth = 0,
}) => {
  const [arrowCommit, setArrowCommit] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [updateCommentMode, setUpdateCommentMode] = useState(false);
  const [commentText, setCommentText] = useState(comment);

  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const { replies } = useSelector((state) => state.comments);
  const commentReplies = replies[id] || [];

  useEffect(() => {
    if (updateCommentMode && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.selectionStart = inputRef.current.value.length;
      inputRef.current.selectionEnd = inputRef.current.value.length;
    }
  }, [updateCommentMode]);

  // send reply
  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    dispatch(
      thunkReplayCommit({
        product_id: productId,
        comment: replyText,
        parent_comment: id,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Reply sent!");
        dispatch(getRepliesByCommentId(id)); // refresh replies
      })
      .catch((err) => toast.error(err));
    setReplyText("");
    setShowReplyInput(false);
  };

  // confirm edit
  const handleConfirmUpdate = () => {
    if (!commentText.trim()) return;
    dispatch(updateComment({ comment_id: id, comments: commentText }))
      .unwrap()
      .then(() => {
        setUpdateCommentMode(false);
        dispatch(getAllCommentsByIdThunk(productId));
      })
      .catch((err) => toast.error(err));
  };

  // delete comment
  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment({ comment_id: commentId, productId }))
      .unwrap()
      .catch((err) =>
        err === "لم يتم العثور على التعليق"
          ? toast.error("هذا التعليق ليس لك")
          : toast.error(err)
      );
  };

  // toggle replies
  const toggleReplies = () => {
    if (!arrowCommit) {
      dispatch(getRepliesByCommentId(id));
    }
    setArrowCommit(!arrowCommit);
    setArrow(!arrowCommit);
  };

  return (
    <div className={`flex gap-2 mt-4 pb-2 relative ${depth > 0 ? "ml-8" : ""}`}>
      {/* connecting line like Facebook */}
      {depth > 0 && (
        <div
          className="absolute right-[-18px] top-2 bottom-0 border-r"
          style={{ borderColor: "#E4E6EB" }}
        ></div>
      )}

      <ToastContainer />
      <img
        src={user?.avatar || cat}
        alt="صورة المستخدم"
        className="w-12 h-12 object-cover rounded-full"
      />

      <div className="flex items-start justify-between w-3/4 lg:w-2/5">
        <div className="flex flex-col w-full">
          {/* user name and time */}
          <div className="flex gap-2 mb-1">
            <span className="text-[#1877F2] font-semibold text-[1rem]">
              {user?.name}
            </span>
            <span className="font-normal text-[0.9rem] text-[#65676B]">
              <TimeAgo postDate={createdAt} />
            </span>
          </div>

          {/* comment text */}
          <div className="flex items-center gap-2 bg-[#F0F2F5] px-3 py-2 rounded-2xl">
            <input
              type="text"
              disabled={!updateCommentMode}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              ref={inputRef}
              className="border-none bg-transparent w-full focus:outline-none text-[#050505]"
            />
            {updateCommentMode && (
              <button
                onClick={handleConfirmUpdate}
                className="bg-[#1877F2] text-white px-3 py-1 rounded-2xl text-sm hover:bg-[#166FE5]"
              >
                Save
              </button>
            )}
          </div>

          {/* reply +إظهار الردود */}
          <div className="relative mt-2">
            <div className="flex items-center gap-3 text-[#65676B] text-sm">
              <span
                onClick={() => setShowReplyInput(!showReplyInput)}
                className="cursor-pointer hover:text-[#1877F2]"
              >
                Reply
              </span>
              <span
                onClick={toggleReplies}
                className="cursor-pointer flex items-center gap-1"
              >
                {arrowCommit ? (
                  <>
                    <img src={arrowTopCommit} alt="السهم للأعلى" />
                    إخفاء الردود ({commentReplies.length})
                  </>
                ) : (
                  <>
                    <img src={arrowBottomCommit} alt="السهم للأسفل" />
                    إظهار الردود ({commentReplies.length})
                  </>
                )}
              </span>
            </div>

            {/* reply input */}
            {showReplyInput && (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  className="border border-[#CCD0D5] rounded-2xl px-3 py-1 w-full text-sm"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button
                  onClick={handleReplySubmit}
                  className="bg-[#1877F2] text-white px-3 py-1 rounded-2xl text-sm hover:bg-[#166FE5]"
                >
                  Send
                </button>
              </div>
            )}

            {/* replies list */}
            {arrowCommit && (
              <div className="ml-6 mt-3">
                {commentReplies.length > 0 ? (
                  commentReplies.map((reply) => (
                    <Commit
                      key={reply._id}
                      comment={reply.comments}
                      createdAt={reply.createdAt}
                      user={reply.user_id}
                      setArrow={setArrow}
                      id={reply._id}
                      productId={productId}
                      depth={depth + 1}
                    />
                  ))
                ) : (
                  <p className="text-[#65676B] text-sm">No replies yet</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* edit & delete */}
        <div className="relative">
          <img
            src={iconSettingUser}
            alt="إعدادات التعليق"
            className="cursor-pointer"
            onClick={() => setShowOption((prev) => !prev)}
          />
          {showOption && (
            <div className="absolute top-9 left-3 text-[.8rem] bg-white shadow-md rounded-md p-1 z-10">
              <div
                className="flex items-center gap-1 w-36 cursor-pointer hover:bg-gray-100 p-1"
                onClick={() => {
                  setUpdateCommentMode(!updateCommentMode);
                  setShowOption(false);
                }}
              >
                <img src={updatedIcon} alt="تعديل" />
               تعديل التعليق
              </div>
              <div
                className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-1"
                onClick={() => handleDeleteComment(id)}
              >
                <img src={deleteIcon} alt="حذف" />
                حذف التعليق
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Commit;
