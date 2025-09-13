import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const productsThunkById = createAsyncThunk(
  "/products/id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/user/get_product_user/${id}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response?.data?.message);
    }
  }
);
