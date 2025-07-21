import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { setLike } from "../productSlice";

export const toggleLikeProduct = createAsyncThunk(
  "/toggleLikeProduct",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/user/likedProduct",
        {
          product_id: id,
        },
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      dispatch(setLike(data));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
