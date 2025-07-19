// src/store/like/thunk/getAllLikes.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const getAllLikes = createAsyncThunk(
  "likes/getAllLikes",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `user/get_all_likes?productId=${productId}`
      );

      const count = res.data.count;
      const users = res.data.users;

      const token = Cookies.get("token");
      let liked = false;

      if (token) {
        const decoded = jwtDecode(token);
        const userName = decoded?.name;
        liked = users.includes(userName);
      }

      return {
        productId,
        totalLikes: count,
        liked,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || "فشل في جلب الإعجابات");
    }
  }
);
