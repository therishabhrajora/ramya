import { configureStore, combineReducers } from "@reduxjs/toolkit";
import navbarReducer from "../slices/NavBarSlice";
import productSlice from "../slices/ProductSlice";
import authSlice from "../slices/AuthSlice";
import addressSlice from "../slices/AddressSlice";
import orderSlice from "../slices/OrderSlice";

const appReducer = combineReducers({
  navBar: navbarReducer,
  product: productSlice,
  auth: authSlice,
  address: addressSlice,
  order: orderSlice
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined; 
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer 
});
