import { createAsyncThunk } from "@reduxjs/toolkit";
import * as jwt_decode from "jwt-decode"; // ✅ هذا يحل المشكلة مع Vite
import Cookies from "js-cookie";
import axios from "axios";
import { setLike } from "../productSlice";

export const toggleLikeProduct = createAsyncThunk(
  "/toggleLikeProduct",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = Cookies.get("token");

      const { data } = await axios.post(
        "/user/likedProduct",
        { product_id: id },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ استخراج userId من JWT
      const decoded = jwt_decode.default(token); // مهم جداً هنا
      const userId = decoded._id;

      const likedData = {
        productId: id,
        liked: data.liked,
        totalLikes: data.totalLikes,
        userId,
      };

      dispatch(setLike(likedData));
      return likedData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "حدث خطأ");
    }
  }
);
