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

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    products: [
      // 1–12: Mens and Womens V-neck Scrubs (Blue + Black, All Prices)
      {
        id: 1,
        name: "Ecoflex V-Neck Scrub (Mens)",
        image: ecoflex_vneck_mens,
        gender: "men",
        price: 2399,
        color: "blue",
        rating: 4.8,
      },
      {
        id: 2,
        name: "Ecoflex V-Neck Scrub (Womens)",
        image: ecoflex_vneck_womens,
        gender: "women",
        price: 2399,
        color: "blue",
        rating: 4.1,
      },
      {
        id: 3,
        name: "Ecoflex V-Neck Scrub (Womens) - Black",
        image: excoflex_vneck_womens_black,
        gender: "women",
        price: 2399,
        color: "black",
        rating: 4.3,
      },
      {
        id: 4,
        name: "Ecoflex V-Neck Scrub (Mens) - Black",
        image: ecoflex_vneck_mens_black,
        gender: "men",
        price: 2399,
        color: "black",
        rating: 4.0,
      },
      {
        id: 5,
        name: "Ecoflex V-Neck Scrub (Mens)",
        image: ecoflex_vneck_mens,
        gender: "men",
        price: 1099,
        color: "blue",
        rating: 4.6,
      },
      {
        id: 6,
        name: "Ecoflex V-Neck Scrub (Womens)",
        image: ecoflex_vneck_womens,
        gender: "women",
        price: 1099,
        color: "blue",
        rating: 4.8,
      },
      {
        id: 7,
        name: "Ecoflex V-Neck Scrub (Womens) - Black",
        image: excoflex_vneck_womens_black,
        gender: "women",
        price: 1099,
        color: "black",
        rating: 4.3,
      },
      {
        id: 8,
        name: "Ecoflex V-Neck Scrub (Mens) - Black",
        image: ecoflex_vneck_mens_black,
        gender: "men",
        price: 1099,
        color: "black",
        rating: 4.4,
      },
      {
        id: 9,
        name: "Ecoflex V-Neck Scrub (Mens)",
        image: ecoflex_vneck_mens,
        gender: "men",
        price: 2499,
        color: "blue",
        rating: 4.9,
      },
      {
        id: 10,
        name: "Ecoflex V-Neck Scrub (Womens)",
        image: ecoflex_vneck_womens,
        gender: "women",
        price: 2499,
        color: "blue",
        rating: 4.2,
      },
      {
        id: 11,
        name: "Ecoflex V-Neck Scrub (Womens) - Black",
        image: excoflex_vneck_womens_black,
        gender: "women",
        price: 2499,
        color: "black",
        rating: 4.1,
      },
      {
        id: 12,
        name: "Ecoflex V-Neck Scrub (Mens) - Black",
        image: ecoflex_vneck_mens_black,
        gender: "men",
        price: 2499,
        color: "black",
        rating: 4.4,
      },

      // 13–16: Generic Mens Products
      {
        id: 13,
        name: "Scrub Suit (Mens)",
        gender: "men",
        image: scrubMen,
        price: 1500,
        color: "blue",
        rating: 4.2,
        description:
          "Comfortable and durable medical scrub suit for healthcare professionals.",
      },
      {
        id: 14,
        name: "Lab Coat (Mens)",
        gender: "men",
        image: labCoatMen,
        price: 2000,
        color: "white",
        rating: 4.3,
        description: "Professional lab coat for medical and scientific use.",
      },
      {
        id: 15,
        name: "Ecoflex Scrub Suit (Mens)",
        gender: "men",
        image: ecoflexMen,
        price: 1800,
        color: "blue",
        rating: 4.5,
        description: "Eco-friendly scrub suit made from sustainable materials.",
      },
      {
        id: 16,
        name: "Stethoscope (Mens)",
        gender: "men",
        image: underScrubMen,
        price: 1200,
        color: "grey",
        rating: 4.4,
        description: "Comfortable under scrub for added warmth and comfort.",
      },

      // 17–20: Generic Womens Products
      {
        id: 17,
        name: "Scrub Suit (Womens)",
        gender: "women",
        image: scrubWomen,
        price: 1500,
        color: "blue",
        rating: 4.1,
        description:
          "Comfortable and durable medical scrub suit for healthcare professionals.",
      },
      {
        id: 18,
        name: "Lab Coat (Womens)",
        gender: "women",
        image: labCoatWomen,
        price: 2000,
        color: "white",
        rating: 4.0,
        description: "Professional lab coat for medical and scientific use.",
      },
      {
        id: 19,
        name: "Ecoflex Scrub Suit (Womens)",
        gender: "women",
        image: ecoflexWomen,
        price: 1800,
        color: "blue",
        rating: 4.3,
        description: "Eco-friendly scrub suit made from sustainable materials.",
      },
      {
        id: 20,
        name: "Stethoscope (Womens)",
        gender: "women",
        image: underScrubWomen,
        price: 1200,
        color: "grey",
        rating: 4.2,
        description: "Comfortable under scrub for added warmth and comfort.",
      },
    ],
  },
  reducers: {},
});

export default productSlice.reducer;
