import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "../slices/NavBarSlice";
import productSlice from "../slices/ProductSlice";

export const store = configureStore({
  reducer: {
    navBar: navbarReducer,
    product: productSlice,
  },
});
