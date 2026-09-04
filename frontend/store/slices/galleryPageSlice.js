import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  activeSet: 0,
};

const galleryPageSlice = createSlice({
  name: "galleryPage",
  initialState,
  reducers: {
    openGalleryPage(state, action) {
      state.isOpen = true;
      state.activeSet = action.payload ?? 0;
    },
    closeGalleryPage(state) {
      state.isOpen = false;
    },
    setGallerySet(state, action) {
      state.activeSet = action.payload;
    },
  },
});

export const { openGalleryPage, closeGalleryPage, setGallerySet } = galleryPageSlice.actions;
export default galleryPageSlice.reducer;
