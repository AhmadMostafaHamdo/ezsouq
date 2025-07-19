import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const likeToggleThunk = createAsyncThunk("/wishlist", async (id) => {
  try {
    // إنشاء نسخة جديدة من axios بدون baseURL
    const instance = axios.create();
    const res = await instance.post(
      "/user/favorite/toggle",
      {
        product_id: id,
      },
      {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
});
