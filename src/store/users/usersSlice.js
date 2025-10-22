import { createSlice } from "@reduxjs/toolkit";
import { userThunkById } from "./thunk/userThunkById";
import { userThunkMe } from "./thunk/userThunkMe";
import { getAllUsers } from "./thunk/getAllUsers";
import { updateUser } from "./thunk/updateUser";
import { deleteUser } from "./thunk/deleteUser";
import { updateUserPhoto } from "./thunk/updateUserPhoto";
import { banUser } from "./thunk/banUser";

const initialState = {
  users: [],
  user: null,
  me: null,
  myImg: null,
  loading: false,
  error: null,
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setImgUser: (state, action) => {
      state.myImg = action.payload;
    },
  },
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
    builder.addCase(userThunkMe.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userThunkMe.fulfilled, (state, action) => {
      state.loading = false;
      state.me = action.payload;
    });
    builder.addCase(userThunkMe.rejected, (state, action) => {
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
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.me = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
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
    builder.addCase(banUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(banUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(banUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setImgUser } = usersSlice.actions;

export default usersSlice.reducer;
