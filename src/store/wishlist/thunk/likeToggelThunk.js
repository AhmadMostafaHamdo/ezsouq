import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const likeToggleThunk = createAsyncThunk("/wishlist", async (id) => {
  try {
    const isRecordExist = await axios.get(
      `/wishlist?userId="1"&productId=${id}`
    );
    if (isRecordExist.data.length > 0) {
      await axios.delete(`/wishlist?productId=${id.data[0].id}`);
      return { type: "remove", id };
    } else {
      await axios.post("/wishlist", { userId: 1, productId: id });
      return { type: "add", id };
    }
  } catch (error) {}
});
