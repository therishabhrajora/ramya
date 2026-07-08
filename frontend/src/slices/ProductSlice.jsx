import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    products: [],
    colors: [],
    pockets:[5,8,10],
    gender: ["male", "female"],
    type: ["classic", "ecoflex"],
    cartProducts: JSON.parse(localStorage.getItem("cartProducts")) || [],
  },
  reducers: {
    addToCart: (state, action) => {
      const productInCart = state.cartProducts.find(
        (item) => item.productId === action.payload.productId
      );

      if (productInCart) {
        productInCart.quantity = (productInCart.quantity || 0) + (action.payload.quantity || 1);
      } else {
        const sourceProduct = state.products.find(
          (item) => item.productId === action.payload.productId
        ) || action.payload;

        state.cartProducts.push({
          ...sourceProduct,
          quantity: action.payload.quantity || 1,
        });
      }

      localStorage.setItem("cartProducts", JSON.stringify(state.cartProducts));
      toast.success("Item added to the cart");
    },
    
    removeFromCart: (state, action) => {
      const targetId = action.payload.productId || action.payload;
      
      const updatedCart = state.cartProducts.filter(
        (item) => item.productId !== targetId
      );
      
      state.cartProducts = updatedCart;
      localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
      toast.info("Item removed from cart");
    },

    clearCart: (state) => {
      state.cartProducts = [];
      localStorage.removeItem("cartProducts");
    },

    setProducts: (state, action) => {
      state.products = action.payload;
    },

    setColors:(state,action)=>{
      state.colors = action.payload;
    }
  },
});

export const { addToCart, removeFromCart, setProducts, clearCart, setColors } = productSlice.actions;

export default productSlice.reducer;
