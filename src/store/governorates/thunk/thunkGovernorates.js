import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const thunkGovernorates = createAsyncThunk(
  "/governorates",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("user/governorates");
      return res.data;
    } catch (error) {
      console.log(res.data);

      return rejectWithValue(errorMessage);
    }
  }
);
