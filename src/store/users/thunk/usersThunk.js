import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";

export const usersThunk = createAsyncThunk(
  "/users",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("User ID is missing");
      }

      const res = await axios.get(`/get_user/${id}`);
      return res.data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
