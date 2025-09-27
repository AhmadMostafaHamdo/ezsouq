import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";
export const addGovernorate = createAsyncThunk(
  "governorates/addGovernorate",
  async ({ data }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const res = await axios.post(
        "/admin/add_governorates",
        {
          name: data.governorate,
          cities: data.cities,
        },
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
      return handleThunkError(error, rejectWithValue);
    }
  }
);
