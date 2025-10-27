import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleThunkError } from "../../../utils/utils";
export const productThunkById = createAsyncThunk(
  "/product/id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_USER_PRODUCT_ENDPOINT}/${id}`);
      return res.data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
