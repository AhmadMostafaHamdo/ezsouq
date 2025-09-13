import { createSlice } from "@reduxjs/toolkit";
import { userThunkById } from "./thunk/userThunkById";
import { getAllUsers } from "./thunk/getAllUsers";
import { updateUser } from "./thunk/updateUser";

const initialState = {  
  users: [],
  user: [],
  loading: false,
  loadingUpdateUser: false,
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
    builder.addCase(updateUser.pending, (state) => {
      state.loadingUpdateUser = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loadingUpdateUser = false;
      state.users = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loadingUpdateUser = false;
      state.error = action.payload;
    });
  },
});

export default usersSlice.reducer;
