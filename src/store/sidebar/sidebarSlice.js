import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    sidebarIsOpen: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarIsOpen = !state.sidebarIsOpen; // يغير الحالة بين مفتوح/مغلق
    },
    closeSidebar: (state) => {
      state.sidebarIsOpen = false;
    },
    openSidebar: (state) => {
      state.sidebarIsOpen = true;
    },
  },
});

export const { toggleSidebar, closeSidebar, openSidebar } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
