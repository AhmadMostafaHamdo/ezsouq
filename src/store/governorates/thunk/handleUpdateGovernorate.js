import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";

export const updateGovernorate = createAsyncThunk(
  "governorates/updateGovernorate",
  async ({ gov_id, data }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const res = await axios.put(
        `/admin/update_governorate/${gov_id}`,
        {
          name: data.name,
          cities: data.cities,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
