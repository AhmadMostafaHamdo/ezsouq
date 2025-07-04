import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

export const logout = createAsyncThunk("/logout", async () => {
  try {
    const res = await axios.post(
      "/logout",
      {},
      {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  } finally {
    Cookies.remove("token");
  }
  return null;
});
