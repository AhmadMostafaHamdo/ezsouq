import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getAllMessages = createAsyncThunk(
  "/governorates",
  async (page, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const res = await axios.get(
        `/admin/get_all_message?page=${page}&limit=4`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(res.data);

      return rejectWithValue(errorMessage);
    }
  }
);
