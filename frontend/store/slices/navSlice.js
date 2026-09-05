import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "on-dark",
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setNavTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const { setNavTheme } = navSlice.actions;
export default navSlice.reducer;
