import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    menCollectionOpen: false,
    womenCollectionOpen: false,
    cartOpen: false,
    profileOpen: false,
    increasecount: 0,
  },

  reducers: {
    menCollectionOpen: (state) => {
      state.menCollectionOpen = true;
    },
    womenCollectionOpen: (state) => {
      state.womenCollectionOpen = true;
    },
    menCollectionClose: (state) => {
      state.menCollectionOpen = false;
    },
    womenCollectionClose: (state) => {
      state.womenCollectionOpen = false;
    },
    cartOpen: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    profileOpen: (state) => {
      state.profileOpen = true;
    },
    closeProfile: (state) => {
      state.profileOpen = false;
    },
  },
});

export const {
  menCollectionOpen,
  womenCollectionOpen,
  menCollectionClose,
  womenCollectionClose,
  increasecount,
  cartOpen,
  profileOpen,
  closeProfile,
} = navbarSlice.actions;
export default navbarSlice.reducer;
