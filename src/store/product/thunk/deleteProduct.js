import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

export const deleteProduct = createAsyncThunk(
  "/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");

      const { data } = await axios.delete(`/user/delete_product/${productId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast.success(data?.message);

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || "حدث خطأ");
    }
  }
);
