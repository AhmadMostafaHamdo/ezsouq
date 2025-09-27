import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";

export const toggleLikeProduct = createAsyncThunk(
  "products/toggleLikeProduct",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const { data } = await axios.post(
        "/user/likedProduct",
        { product_id: productId },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
