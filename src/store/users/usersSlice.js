import { createSlice } from "@reduxjs/toolkit";
import { userThunkById } from "./thunk/userThunkById";
import { getAllUsers } from "./thunk/getAllUsers";
import { updateUser } from "./thunk/updateUser";
import { deleteUser } from "./thunk/deleteUser";
import { updateUserPhoto } from "./thunk/updateUserPhoto";

const initialState = {
  users: [],
  user: [],
  loading: false,
  loadingUpdateUser: false,
  loadingDelete: false,
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
      state.users = action.payload.users;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
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
    builder.addCase(deleteUser.pending, (state) => {
      state.loadingDelete = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loadingDelete = false;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loadingDelete = false;
      state.error = action.payload;
    });
    builder.addCase(updateUserPhoto.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserPhoto.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateUserPhoto.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default usersSlice.reducer;
