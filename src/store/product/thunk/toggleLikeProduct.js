// src/store/product/thunk/toggleLikeProduct.js
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
        { product_id: id },
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      // بيانات متوقعة من السيرفر: { message, liked, totalLikes, productId }
      // تأكد أن السيرفر يعيد productId أو يمكنك إضافته هنا بنفسك:
      const likedData = {
        productId: id,
        liked: data.liked,
        totalLikes: data.totalLikes,
      };
      dispatch(setLike(likedData));
      return likedData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "حدث خطأ");
    }
  }
);
