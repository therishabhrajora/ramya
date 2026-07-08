import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: JSON.parse(localStorage.getItem("user_orders_history")) || [],
    currentOrder: null, // Tracks the single most recent order for the dynamic success page screen
  },

  reducers: {
    orderPlaced: (state, action) => {
      state.currentOrder = action.payload;
      
      state.orders.unshift(action.payload);
      
      localStorage.setItem("user_orders_history", JSON.stringify(state.orders));
    },

   
    setOrderHistory: (state, action) => {
      state.orders = action.payload;
      localStorage.setItem("user_orders_history", JSON.stringify(action.payload));
    },

    
    clearOrderState: (state) => {
      state.orders = [];
      state.currentOrder = null;
      localStorage.removeItem("user_orders_history");
    }
  }
});

export const { orderPlaced, setOrderHistory, clearOrderState } = orderSlice.actions;

export const selectAllOrders = (state) => state.order.orders;
export const selectLatestOrder = (state) => state.order.currentOrder;

export default orderSlice.reducer;
