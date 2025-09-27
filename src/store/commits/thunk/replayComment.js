import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";
export const thunkReplayCommit = createAsyncThunk(
  "/commits/replayCommit",
  async ({ product_id, comment, parent_comment }, { rejectWithValue }) => {
    try {
      console.log("thunkReplayCommit");
      console.log(parent_comment);
      console.log(product_id);
      const res = await axios.post(
        "/user/comment",
        {
          product_id,
          comment,
          parent_comment,
        },
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log("thunkReplayCommit");
      console.log("thunkReplayCommit", res.data);
      return res.data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
