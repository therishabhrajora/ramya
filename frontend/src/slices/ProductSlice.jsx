import { createSlice } from "@reduxjs/toolkit";
import scrubWomen from "../assets/women/Scrub.webp";
import scrubMen from "../assets/men/scrubs.webp";
import ecoflexWomen from "../assets/women/Ecoflex.webp";
import ecoflexMen from "../assets/men/ecoflex.webp";
import underScrubMen from "../assets/men/underScrub.webp";
import underScrubWomen from "../assets/women/Underscrub.webp";
import labCoatWomen from "../assets/women/Labcoat.webp";
import labCoatMen from "../assets/men/labCoats.webp";
import ecoflex_vneck_mens from "../assets/men/excoflex_vneck_mens.webp";
import ecoflex_vneck_womens from "../assets/women/excoflex_vneck_womens.webp";
import excoflex_vneck_womens_black from "../assets/women/excoflex_vneck_womens(black).webp";
import ecoflex_vneck_mens_black from "../assets/men/excoflex_vneck_mens(black).webp";
import { useEffect } from "react";

const productSlice = createSlice(
  {
  name: "productSlice",
  initialState: {
    products: [
    //    Ecoflex V-Neck Scrubs (Mens)
    //   {
    //     id: 1,
    //     name: "Ecoflex V-Neck Scrub (Mens)",
    //     image: ecoflex_vneck_mens,
    //     gender: "men",
    //     category: "ecoflex",
    //     price: 2399,
    //     color: "blue",
    //     rating: 4.8,
    //     pocket: 8,
    //   },
    //   {
    //     id: 5,
    //     name: "Ecoflex V-Neck Scrub (Mens)",
    //     image: ecoflex_vneck_mens,
    //     gender: "men",
    //     category: "ecoflex",
    //     price: 1099,
    //     color: "blue",
    //     rating: 4.6,
    //     pocket: 5,
    //   },
    //   {
    //     id: 9,
    //     name: "Ecoflex V-Neck Scrub (Mens)",
    //     image: ecoflex_vneck_mens,
    //     gender: "men",
    //     category: "ecoflex",
    //     price: 2499,
    //     color: "blue",
    //     rating: 4.9,
    //     pocket: 10,
    //   },
    //   {
    //     id: 12,
    //     name: "Ecoflex V-Neck Scrub (Mens) - Black",
    //     image: ecoflex_vneck_mens_black,
    //     gender: "men",
    //     color: "black",
    //     category: "ecoflex",
    //     price: 2499,
    //     rating: 4.4,
    //     pocket: 5,
    //   },

    //   // Ecoflex V-Neck Scrubs (Womens)
    //   {
    //     id: 10,
    //     name: "Ecoflex V-Neck Scrub (Womens)",
    //     image: ecoflex_vneck_womens,
    //     gender: "women",
    //     color: "purple",
    //     category: "ecoflex",
    //     price: 2499,
    //     rating: 4.2,
    //     pocket: 10,
    //   },
    //   {
    //     id: 11,
    //     name: "Ecoflex V-Neck Scrub (Womens) - Black",
    //     image: excoflex_vneck_womens_black,
    //     gender: "women",
    //     color: "black",
    //     category: "ecoflex",
    //     price: 2499,
    //     rating: 4.1,
    //     pocket: 8,
    //   },
    //   {
    //     id: 7,
    //     name: "Ecoflex V-Neck Scrub (Womens) - Black",
    //     image: excoflex_vneck_womens_black,
    //     gender: "women",
    //     color: "black",
    //     category: "ecoflex",
    //     price: 1099,
    //     rating: 4.3,
    //     pocket: 5,
    //   },

    //   // Classic Ecoflex V-Neck Scrubs
    //   {
    //     id: 2,
    //     name: "Classic Ecoflex V-Neck Scrub (Womens)",
    //     category: "classic",
    //     image: ecoflex_vneck_womens,
    //     gender: "women",
    //     color: "purple",
    //     price: 2399,
    //     rating: 4.1,
    //     pocket: 5,
    //   },
    //   {
    //     id: 3,
    //     name: "Classic Ecoflex V-Neck Scrub (Womens) - Black",
    //     category: "classic",
    //     image: excoflex_vneck_womens_black,
    //     gender: "women",
    //     color: "black",
    //     price: 2399,
    //     rating: 4.3,
    //     pocket: 10,
    //   },
    //   {
    //     id: 6,
    //     name: "Classic Ecoflex V-Neck Scrub (Womens)",
    //     category: "classic",
    //     image: ecoflex_vneck_womens,
    //     gender: "women",
    //     color: "purple",
    //     price: 1099,
    //     rating: 4.8,
    //     pocket: 8,
    //   },
    //   {
    //     id: 4,
    //     name: "Classic Ecoflex V-Neck Scrub (Mens) - Black",
    //     category: "classic",
    //     image: ecoflex_vneck_mens_black,
    //     gender: "men",
    //     price: 2399,
    //     color: "black",
    //     rating: 4.0,
    //     pocket: 5,
    //   },
    //   {
    //     id: 8,
    //     name: "Classic Ecoflex V-Neck Scrub (Mens) - Black",
    //     category: "classic",
    //     image: ecoflex_vneck_mens_black,
    //     gender: "men",
    //     price: 1099,
    //     color: "black",
    //     rating: 4.4,
    //     pocket: 8,
    //   },

    //   // Generic Mens Products
    //   {
    //     id: 13,
    //     name: "Scrub Suit (Mens)",
    //     gender: "men",
    //     color: "blue",
    //     image: scrubMen,
    //     price: 1500,
    //     rating: 4.2,
    //     description:
    //       "Comfortable and durable medical scrub suit for healthcare professionals.",
    //     pocket: 8,
    //   },
    //   {
    //     id: 14,
    //     name: "Lab Coat (Mens)",
    //     gender: "men",
    //     image: labCoatMen,
    //     price: 2000,
    //     color: "white",
    //     rating: 4.3,
    //     description: "Professional lab coat for medical and scientific use.",
    //     pocket: 10,
    //   },
    //   {
    //     id: 15,
    //     name: "Ecoflex Scrub Suit (Mens)",
    //     gender: "men",
    //     color: "blue",
    //     image: ecoflexMen,
    //     category: "ecoflex",
    //     price: 1800,
    //     rating: 4.5,
    //     description: "Eco-friendly scrub suit made from sustainable materials.",
    //     pocket: 5,
    //   },
    //   {
    //     id: 16,
    //     name: "Stethoscope (Mens)",
    //     gender: "men",
    //     image: underScrubMen,
    //     category: "stethoscope",
    //     price: 1200,
    //     color: "grey",
    //     rating: 4.4,
    //     description: "Comfortable under scrub for added warmth and comfort.",
    //     pocket: 5,
    //   },

    //   // Generic Womens Products
    //   {
    //     id: 17,
    //     name: "Scrub Suit (Womens)",
    //     gender: "women",
    //     color: "purple",
    //     image: scrubWomen,
    //     price: 1500,
    //     rating: 4.1,
    //     description:
    //       "Comfortable and durable medical scrub suit for healthcare professionals.",
    //     pocket: 8,
    //   },
    //   {
    //     id: 18,
    //     name: "Lab Coat (Womens)",
    //     gender: "women",
    //     color: "white",
    //     image: labCoatWomen,
    //     price: 2000,
    //     rating: 4.0,
    //     description: "Professional lab coat for medical and scientific use.",
    //     pocket: 10,
    //   },
    //   {
    //     id: 19,
    //     name: "Ecoflex Scrub Suit (Womens)",
    //     gender: "women",
    //     color: "purple",
    //     image: ecoflexWomen,
    //     category: "ecoflex",
    //     price: 1800,
    //     rating: 4.3,
    //     description: "Eco-friendly scrub suit made from sustainable materials.",
    //     pocket: 5,
    //   },
    //   {
    //     id: 20,
    //     name: "Stethoscope (Womens)",
    //     gender: "women",
    //     color: "grey",
    //     image: underScrubWomen,
    //     price: 1200,
    //     category: "stethoscope",
    //     rating: 4.2,
    //     description: "Comfortable under scrub for added warmth and comfort.",
    //     pocket: 8,
    //   },
    ],
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
        (item) => item.id === action.payload.id
      );
      if (product) {
        const productInCart = state.cartProducts.find(
          (item) => item.id === product.id
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
      const productid = action.payload.id;
      console.log("Removing product with ID:", productid);
      const updatedCart = state.cartProducts.filter(
        (item) => item.id !== productid
      );
      state.cartProducts = updatedCart;
      localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
    },

     setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, cartProducts,setProducts } = productSlice.actions;
export default productSlice.reducer;
