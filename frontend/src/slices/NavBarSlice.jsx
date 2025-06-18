import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
    name:"navbar",
    initialState:{
        menCollectionOpen:false,
        womenCollectionOpen:false,
        increasecount:0,
    },

    reducers:{
        menCollectionOpen: (state) => {
            state.menCollectionOpen = !state.menCollectionOpen;
        },
        womenCollectionOpen: (state) => {
            state.womenCollectionOpen = !state.womenCollectionOpen;
        },
        increasecount: (state) => {
            state.count += 1;
        },
    },
});

export const { menCollectionOpen ,womenCollectionOpen,increasecount} = navbarSlice.actions;
export default navbarSlice.reducer;

