import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getAllWishes = createAsyncThunk("/wishlist", async (id) => {
  try {
    const res = await axios.get("/user/get_all_wishes", {
      headers: {
        authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    console.log(res.data);
    return res?.data?.items;
  } catch (error) {
    throw error.response.data;
  }
});
