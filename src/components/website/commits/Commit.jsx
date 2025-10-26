import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

import arrowTopCommit from "../../../assets/images/arrowTopCommit.svg";
import arrowBottomCommit from "../../../assets/images/arrowBottomCommit.svg";
import iconSettingUser from "../../../assets/images/dashboard/iconSettingUser.svg";
import deleteIcon from "../../../assets/images/dashboard/deleteIcon.svg";
import updatedIcon from "../../../assets/images/updatedIcon.svg";
import personal from "../../../assets/images/pesonal.png";

import TimeAgo from "../../TimeAgo";
import useUserId from "../../../hooks/useUserId";
import { deleteComment } from "../../../store/commits/thunk/deleteCommit";
import { updateComment } from "../../../store/commits/thunk/updateComment";
import { getAllCommentsByIdThunk } from "../../../store/commits/thunk/getAllCommentsById";
import { thunkReplayCommit } from "../../../store/commits/thunk/replayComment";
import { getRepliesByCommentId } from "../../../store/commits/thunk/getRepliesByCommentId";
import EditableComment from "./EditableComment";

/* -------------------------------------------------------------------------- */
/*                             Commit Component                               */
/* -------------------------------------------------------------------------- */

const Commit = ({
  comment,
  createdAt,
  user,
  setArrow,
  id,
  productId,
  depth = 0,
}) => {
  console.log(user);
  // -------------------- Local States --------------------
  const [arrowCommit, setArrowCommit] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [updateCommentMode, setUpdateCommentMode] = useState(false);
  const [commentText, setCommentText] = useState(comment);

  // -------------------- Hooks --------------------
  const userId = useUserId();
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const { replies } = useSelector((state) => state.comments);
  const commentReplies = replies[id] || [];

  /* -------------------- Close Menu on Outside Click -------------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowOption(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* -------------------- Handle Reply Submit -------------------- */
  const handleReplySubmit = useCallback(() => {
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
        toast.success("تم إرسال الرد!");
        dispatch(getRepliesByCommentId(id));
      })
      .catch((err) => toast.error(err));

    setReplyText("");
    setShowReplyInput(false);
  }, [replyText, dispatch, productId, id]);

  /* -------------------- Handle Comment Update -------------------- */
  const handleConfirmUpdate = useCallback(() => {
    if (!commentText.trim()) return;

    dispatch(updateComment({ comment_id: id, comments: commentText }))
      .unwrap()
      .then(() => {
        toast.success("تم تعديل التعليق!");
        setUpdateCommentMode(false);
        dispatch(getAllCommentsByIdThunk(productId));
      })
      .catch((err) => toast.error(err));
  }, [commentText, dispatch, id, productId]);

  /* -------------------- Handle Delete Comment -------------------- */
  const handleDeleteComment = useCallback(
    (commentId) => {
      dispatch(deleteComment({ comment_id: commentId, productId }))
        .unwrap()
        .then(() => dispatch(getAllCommentsByIdThunk(productId)))
        .catch((err) =>
          err === "لم يتم العثور على التعليق"
            ? toast.error("هذا التعليق ليس لك")
            : toast.error(err)
        );
    },
    [dispatch, productId]
  );

  /* -------------------- Toggle Replies Display -------------------- */
  const toggleReplies = useCallback(() => {
    if (!arrowCommit) dispatch(getRepliesByCommentId(id));
    setArrowCommit((prev) => !prev);
    setArrow((prev) => !prev);
  }, [arrowCommit, dispatch, id, setArrow]);

  /* -------------------- Determine User Image -------------------- */
  const userImage = user?.avatar
    ? user.avatar.startsWith("http://")
      ? user.avatar.replace("http://", "https://")
      : user.avatar
    : personal;

  return (
    <div className={`flex gap-2 mt-4 pb-2 relative ${depth > 0 ? "ml-8" : ""}`}>
      {/* Vertical line for nested replies */}
      {depth > 0 && (
        <div
          className="absolute right-[-18px] top-2 bottom-0 border-r"
          style={{ borderColor: "#E4E6EB" }}
        ></div>
      )}

      {/* User Image */}
      <img
        src={userImage}
        alt="صورة المستخدم"
        className="w-12 h-12 object-cover rounded-full"
      />

      <div className="flex items-start justify-between w-3/4 lg:w-2/5">
        <div className="flex flex-col w-full">
          {/* ---------- Username & Time ---------- */}
          <div className="flex gap-2 mb-1">
            <span className="text-[#1877F2] font-semibold text-[1rem]">
              {user?.name}
            </span>
            <span className="font-normal text-[0.9rem] text-[#65676B]">
              <TimeAgo postDate={createdAt} />
            </span>
          </div>

          {/* ---------- Comment Text (editable) ---------- */}
          <EditableComment
            value={commentText}
            onChange={setCommentText}
            onSave={handleConfirmUpdate}
            isEditing={updateCommentMode}
          />

          {/* ---------- Reply + Replies Toggle ---------- */}
          <div className="relative mt-2">
            <div className="flex items-center gap-3 text-[#65676B] text-sm">
              {/* Reply Button */}
              <span
                onClick={() => setShowReplyInput((prev) => !prev)}
                className="cursor-pointer hover:text-[#1877F2]"
              >
                الرد
              </span>

              {/* Toggle Replies */}
              <span
                onClick={toggleReplies}
                className="cursor-pointer flex items-center gap-1"
              >
                {arrowCommit ? (
                  <>
                    <img src={arrowTopCommit} alt="سهم لأعلى" />
                    إخفاء الردود ({commentReplies.length})
                  </>
                ) : (
                  <>
                    <img src={arrowBottomCommit} alt="سهم لأسفل" />
                    إظهار الردود ({commentReplies.length})
                  </>
                )}
              </span>
            </div>

            {/* ---------- Reply Input ---------- */}
            {showReplyInput && (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="اكتب ردًا..."
                  className="border border-[#CCD0D5] rounded-2xl px-3 py-1 w-52 text-sm"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button
                  onClick={handleReplySubmit}
                  className="bg-[#1877F2] text-white px-3 py-1 rounded-2xl text-sm hover:bg-[#166FE5]"
                >
                  إرسال
                </button>
              </div>
            )}

            {/* ---------- Replies Section ---------- */}
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
                  <p className="text-[#65676B] text-sm">لا يوجد ردود</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ---------- Comment Settings Menu ---------- */}
        {userId === user?._id && (
          <div className="relative">
            <img
              src={iconSettingUser}
              alt="إعدادات التعليق"
              className="cursor-pointer"
              onClick={() => setShowOption((prev) => !prev)}
            />

            <AnimatePresence>
              {showOption && (
                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-9 left-3 text-[.8rem] bg-white shadow-md rounded-md p-1 z-10"
                >
                  {/* Edit Option */}
                  <div
                    className="flex items-center gap-1 w-36 cursor-pointer hover:bg-gray-100 p-1 rounded transition"
                    onClick={() => {
                      setUpdateCommentMode((prev) => !prev);
                      setShowOption(false);
                    }}
                  >
                    <img src={updatedIcon} alt="تعديل التعليق" />
                    تعديل التعليق
                  </div>

                  {/* Delete Option */}
                  <div
                    className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-1 rounded transition"
                    onClick={() => handleDeleteComment(id)}
                  >
                    <img src={deleteIcon} alt="حذف التعليق" />
                    حذف التعليق
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Commit);
