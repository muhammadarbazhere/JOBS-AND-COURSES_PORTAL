import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const initialState = {
  isLoggedin: !!token,
  token: token || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedin = true;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout(state) {
      state.isLoggedin = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
