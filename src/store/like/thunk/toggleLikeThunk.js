// ✅ toggleLikeThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { getAllLikes } from "./getAllLikes";

export const toggleLikeThunk = createAsyncThunk(
  "likes/toggleLike",
  async (productId, { dispatch, rejectWithValue }) => {
    try {
     const resToggle= await axios.post(
        "/user/likedProduct",
        { product_id: productId },
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
console.log(
  
  
)
      const resLikes = await dispatch(getAllLikes(productId)).unwrap();
      return {
        productId,
        liked: resLikes.liked,
        totalLikes: resLikes.totalLikes,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || "فشل في تبديل الإعجاب");
    }
  }
);
