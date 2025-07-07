import { createSlice } from "@reduxjs/toolkit";

const tokenFromLocalStorage = localStorage.getItem("token");
const userFromLocalStorage = localStorage.getItem("user");
const roleFromLocalStorage = localStorage.getItem("role");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: tokenFromLocalStorage || null,
    user: userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null,
    isLoggedIn: !!tokenFromLocalStorage,
     role: roleFromLocalStorage || null,
  },

  reducers: {
    loginSuccess: (state, action) => {
      const { token, user, role } = action.payload;
      state.token = token;
      state.user = user;
      state.role = role;
      state.isLoggedIn = true;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
      state.isLoggedIn = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
