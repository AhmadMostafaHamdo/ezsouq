import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";
export const thunkAddCommit = createAsyncThunk(
  "/commits/addCommit",
  async ({ product_id, comment }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_USER_COMMENT_ENDPOINT,
        {
          product_id,
          comment,
        },
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error)
      return handleThunkError(error, rejectWithValue);
    }
  }
);
