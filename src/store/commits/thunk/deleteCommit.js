import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";
export const deleteComment = createAsyncThunk(
  "/commits/deleteCommit",
  async ({ comment_id }, { rejectWithValue }) => {
    try {
      console.log(comment_id);
      const res = await axios.delete(`/user/delete_comment/${comment_id}`, {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      toast.success(res.data?.message);
      return res.data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
