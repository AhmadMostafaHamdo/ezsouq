import { createSlice } from "@reduxjs/toolkit";
import { getAllMessages } from "./thunk/getAllMessages";
import { deleteMessage } from "./thunk/deleteMessageById";

const initialState = {
  loading: false,
  error: null,
  messages: {},
  successMessage: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // === Get all messages ===
      .addCase(getAllMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
        state.error = null;
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === Delete message ===
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
        if (state.messages?.messages) {
          state.messages.messages = state.messages.messages.filter(
            (msg) => msg._id !== action.payload.id
          );
        }
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default messagesSlice.reducer;
