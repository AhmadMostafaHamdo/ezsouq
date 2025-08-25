import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

export const deleteProduct = createAsyncThunk(
  "/deleteProduct",
  async (reporteId, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");

      const { data } = await axios.delete(`/user/delete_report/${reporteId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "حدث خطأ");
    }
  }
);
