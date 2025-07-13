// import { createSlice } from "@reduxjs/toolkit";

// const token = localStorage.getItem("token");

// const initialState = {
//   isLoggedin: !!token,
//   token: token || null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login(state, action) {
//       state.isLoggedin = true;
//       state.token = action.payload;
//       localStorage.setItem("token", action.payload);
//     },
//     logout(state) {
//       state.isLoggedin = false;
//       state.token = null;
//       localStorage.removeItem("token");
//     },
//   },
// });

// export const authActions = authSlice.actions;
// export default authSlice.reducer;















import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

// 👇 Check if token is valid
function isTokenValid(token) {
  if (!token) return false; // No token
  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now(); // Check expiry
    return !isExpired;
  } catch (err) {
    return false; // Malformed token
  }
}

const token = localStorage.getItem("token");
const tokenValid = isTokenValid(token);

if (!tokenValid) {
  localStorage.removeItem("token"); // Clean bad token
}

const initialState = {
  isLoggedin: tokenValid,
  token: tokenValid ? token : null,
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
