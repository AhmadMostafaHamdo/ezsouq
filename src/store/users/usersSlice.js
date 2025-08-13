import { createSlice } from "@reduxjs/toolkit";
import { userThunkById } from "./thunk/userThunkById";
import { getAllUsers } from "./thunk/getAllUsers";

const initialState = {
  users: [],
  user: [],
  loading: false,
  error: null,
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userThunkById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userThunkById.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(userThunkById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default usersSlice.reducer;
