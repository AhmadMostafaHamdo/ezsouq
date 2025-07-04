import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const productThunk = createAsyncThunk("/products", async () => {
  try {
    const res = await axios.get("/products");
    console.log(res.data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message);
  }
});
