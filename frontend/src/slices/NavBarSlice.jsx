import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
    name:"navbar",
    initialState:{
        menCollectionOpen:false,
        womenCollectionOpen:false,
        cartOpen:false,
        increasecount:0,
    },

    reducers:{
        menCollectionOpen: (state) => {
            state.menCollectionOpen = !state.menCollectionOpen;
        },
        womenCollectionOpen: (state) => {
            state.womenCollectionOpen = !state.womenCollectionOpen;
        },
        menCollectionClose: (state) => {
            state.menCollectionOpen = !state.menCollectionOpen;
        },
        womenCollectionClose: (state) => {
            state.womenCollectionOpen = !state.womenCollectionOpen;
        },
        increasecount: (state) => {
            state.count += 1;
        },
        cartOpen:(state)=>{
            state.cartOpen=!state.cartOpen;
        }
    },
});

export const { menCollectionOpen ,womenCollectionOpen,menCollectionClose ,womenCollectionClose,increasecount,cartOpen} = navbarSlice.actions;
export default navbarSlice.reducer;

