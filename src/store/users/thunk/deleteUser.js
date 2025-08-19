import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const deleteUser = createAsyncThunk(
  "/users",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("User ID is missing");
      }

      const res = await axios.delete(`/admin/Delet_User}`, {
        user_id: id,
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);
