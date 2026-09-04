import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  activeIndex: 0,
};

const wallModalSlice = createSlice({
  name: "wallModal",
  initialState,
  reducers: {
    openWallModal(state, action) {
      state.isOpen = true;
      state.activeIndex = action.payload ?? 0;
    },
    closeWallModal(state) {
      state.isOpen = false;
    },
    setWallIndex(state, action) {
      state.activeIndex = action.payload;
    },
  },
});

export const { openWallModal, closeWallModal, setWallIndex } = wallModalSlice.actions;
export default wallModalSlice.reducer;
