import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "../slices/NavBarSlice";
import productSlice from "../slices/ProductSlice";
import authSlice from "../slices/AuthSlice";


export const store = configureStore({
  reducer: {
    navBar: navbarReducer,
    product: productSlice,
    auth:authSlice
  },
});
