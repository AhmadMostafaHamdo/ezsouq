import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  itemId: [],
};
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
});
export default wishlistSlice.reducer;
