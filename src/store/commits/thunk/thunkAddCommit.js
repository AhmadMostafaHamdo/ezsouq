import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
export const thunkAddCommit = createAsyncThunk(
  "/commits/addCommit",
  async ({ productId, comment }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "/user/comment",
        {
          product_id: productId,
          comment,
        },
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(res.data)
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
