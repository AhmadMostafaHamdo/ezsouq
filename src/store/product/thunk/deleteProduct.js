import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";

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
      return handleThunkError(error, rejectWithValue);
    }
  }
);
