import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";

export const productsThunkForMe = createAsyncThunk(
  "/productsMe/id",
  async (id, { rejectWithValue }) => {
    try {
      console.log("id", id);
      const res = await axios.get(`/user/get_product_user/${id}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
