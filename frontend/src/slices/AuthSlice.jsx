import { createSlice } from "@reduxjs/toolkit";

// 1. Safe parsing utility to guard against corrupted localStorage strings crashing the app
const getSafeUserFromStorage = () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;
  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Failed to parse corrupted user object from localStorage:", error);
    localStorage.removeItem("user"); 
    return null;
  }
};

const tokenFromLocalStorage = localStorage.getItem("token");
const roleFromLocalStorage = localStorage.getItem("role");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: tokenFromLocalStorage || null,
    user: getSafeUserFromStorage(),
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
      localStorage.setItem("profile", JSON.stringify(user));
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
      state.isLoggedIn = false;

      localStorage.removeItem("token");
      localStorage.removeItem("profile");
      localStorage.removeItem("role");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAdmin = (state) => state.auth.role === "admin";

export default authSlice.reducer;
