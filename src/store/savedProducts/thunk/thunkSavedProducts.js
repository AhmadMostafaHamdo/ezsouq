import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";
export const thunkSavedProducts = createAsyncThunk(
  "/products/saved",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/user/product/${id}`);
      return res.data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
