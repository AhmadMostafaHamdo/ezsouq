import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { handleThunkError } from "../../../utils/utils";

export const likeToggleWishlistThunk = createAsyncThunk(
  "/wishlist",
  async (_id) => {
    try {
      // إنشاء نسخة جديدة من axios بدون baseURL
      const instance = axios.create();
      const res = await instance.post(
        "/user/favorite/toggle",
        {
          product_id: _id,
        },
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
