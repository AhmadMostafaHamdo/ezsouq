  import { createAsyncThunk } from "@reduxjs/toolkit";
  import axios from "axios";
  export const thunkGetProductByCat = createAsyncThunk(
    "/thunkGetProductByCat/cat",
    async (category, { rejectWithValue }) => {
      try {
        const res = await axios.get(`user/fliteredProducts?Category=${category}`);
        return res?.data?.items;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message);
      }
    }
  );
