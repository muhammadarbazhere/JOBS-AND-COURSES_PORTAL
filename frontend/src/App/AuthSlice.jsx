// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoggedin = true;
    },
    logout(state) {
      state.isLoggedin = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

