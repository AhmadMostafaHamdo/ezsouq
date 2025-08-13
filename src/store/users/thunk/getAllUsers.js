import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk(
  "/getAllUsers",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get("/admin/get_users",{headers:{
        
      }});
      console.log(res.data)
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);
