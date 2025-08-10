import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    products: [],
    colors: [
      { label: "Black", value: "black" },
      { label: "Ciel Blue", value: "blue" },
      { label: "Navy", value: "navy" },
      { label: "Wine", value: "wine" },
      { label: "Forest Green", value: "green" },
      { label: "Heather Grey", value: "grey" },
    ],
    pockets: [5, 8, 10],
    gender: ["male", "female"],
    type: ["classic", "ecoflex"],
    cartProducts: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = state.products.find(
        (item) => item.productId === action.payload.productId
      );
      if (product) {
        const productInCart = state.cartProducts.find(
          (item) => item.productId === product.productId
        );
        if (productInCart) {
          productInCart.quantity =
            (productInCart.quantity || 0) + action.payload.quantity;
        } else {
          state.cartProducts.push({
            ...product,
            quantity: action.payload.quantity,
          });
        }
        localStorage.setItem(
          "cartProducts",
          JSON.stringify(state.cartProducts)
        );
      }
    },

    removeFromCart: (state, action) => {
      const product = action.payload;
      const updatedCart = state.cartProducts.filter(
        (item) => item.productId !== product.productId
      );
      state.cartProducts = updatedCart;
      localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
    },

    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, cartProducts, setProducts } =
  productSlice.actions;
export default productSlice.reducer;
