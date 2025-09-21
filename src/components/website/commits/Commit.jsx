import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
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

const Commit = ({ comment, createdAt, user, setArrow, id, productId }) => {
  const [arrowCommit, setArrowCommit] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [updateCommentMode, setUpdateCommentMode] = useState(false);
  const [commentText, setCommentText] = useState(comment);

  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (updateCommentMode && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.selectionStart = inputRef.current.value.length;
      inputRef.current.selectionEnd = inputRef.current.value.length;
    }
  }, [updateCommentMode]);

  // إرسال الرد
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
        toast.success("تم إرسال الرد!");
      })
      .catch((err) => toast.error(err));
    setReplyText("");
    setShowReplyInput(false);
  };

  // تأكيد تعديل التعليق
  const handleConfirmUpdate = () => {
    console.log("dadsasdas");
    if (!commentText.trim()) return;
    dispatch(updateComment({ comment_id: id, comments: commentText }))
      .unwrap()
      .then(() => {
        setUpdateCommentMode(false);
        dispatch(getAllCommentsByIdThunk(productId));
        toast.success("تم تعديل التعليق بنجاح!");
      })
      .catch((err) => toast.error(err));
  };

  // حذف التعليق
  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment({ comment_id: commentId }))
      .unwrap()
      .then(() => {
        dispatch(getAllCommentsByIdThunk(productId));
        toast.success("تم حذف التعليق!");
      })
      .catch((err) =>
        err == "لم يتم العثور على التعليق"
          ? toast.error("هذا التعليق ليس لك")
          : err
      );
  };

  return (
    <div className="flex gap-2 mt-4 pb-2">
      <ToastContainer />
      <img src={cat} alt="" className="w-16 h-16 object-cover" />
      <div className="flex items-start justify-between w-2/5">
        <div className="flex flex-col w-full">
          {/* اسم المستخدم ووقت النشر */}
          <div className="flex gap-2 mb-1">
            <span className="text-primary font-bold text-[1.25rem]">
              {user?.name}
            </span>
            <span className="font-normal text-[1rem] text-[#716D97]">
              <TimeAgo postDate={createdAt} />
            </span>
          </div>

          {/* نص التعليق + زر تأكيد التعديل */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              disabled={!updateCommentMode}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              ref={inputRef}
              className="border-none bg-[#F7F7FF] w-full rounded-md px-2 py-1"
            />
            {updateCommentMode && (
              <button
                onClick={handleConfirmUpdate}
                className="bg-primary text-white px-3 py-1 rounded-md text-[.8rem]"
              >
                تأكيد
              </button>
            )}
          </div>

          {/* عرض الردود وأيقونات */}
          <div className="flex items-center gap-2 font-normal text-[1rem] text-[#615D81] mt-2">
            <span>عرض الردود (1)</span>
            <span
              onClick={() => {
                setArrowCommit(!arrowCommit);
                setArrow(!arrowCommit);
              }}
              className="cursor-pointer"
            >
              {arrowCommit ? (
                <img src={arrowTopCommit} alt="" />
              ) : (
                <img src={arrowBottomCommit} alt="" />
              )}
            </span>
            <img
              src={replayCommit}
              alt=""
              className="mr-4 cursor-pointer"
              onClick={() => setShowReplyInput(!showReplyInput)}
            />
          </div>

          {/* حقل الرد */}
          {showReplyInput && (
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                placeholder="اكتب ردك..."
                className="border border-gray-300 rounded-lg px-3 py-1 w-full"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button
                onClick={handleReplySubmit}
                className="bg-primary text-white px-3 py-1 rounded-lg"
              >
                إرسال
              </button>
            </div>
          )}
        </div>

        {/* خيارات تعديل وحذف */}
        <div className="relative">
          <img
            src={iconSettingUser}
            className="cursor-pointer"
            onClick={() => setShowOption((prev) => !prev)}
          />
          {showOption && (
            <div className="absolute top-9 left-3 text-[.8rem] bg-white shadow-md rounded-md p-1">
              <div
                className="flex items-center gap-1 w-36 cursor-pointer hover:bg-gray-100 p-1"
                onClick={() => {
                  setUpdateCommentMode(!updateCommentMode);
                  setShowOption(false);
                }}
              >
                <img src={updatedIcon} alt="" />
                تعديل التعليق
              </div>
              <div
                className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-1"
                onClick={() => handleDeleteComment(id)}
              >
                <img src={deleteIcon} alt="" />
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
