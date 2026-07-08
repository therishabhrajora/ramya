import { createSlice } from "@reduxjs/toolkit";


const addressSlice = createSlice({
    name: "address",
    initialState: {
        addresses: []
    },

    reducers: {
          setAddresses: (state, action) => {
            // Flatten any accidentally nested data layers and overwrite the state cleanly
            state.addresses = Array.isArray(action.payload) ? action.payload.flat() : [];
        },

        updateAddress: (state, action) => {
            const index = state.addresses.findIndex(addr => addr.id === action.payload.id);

            if (index !== -1) {
                if (action.payload.isDefault) {
                    state.addresses.forEach(addr => addr.isDefault = false);
                }

                state.addresses[index] = {
                    ...state.addresses[index],
                    ...action.payload
                };
            } else {
                state.addresses.push(action.payload);
            }


        },


        addAddress: (state, action) => {

            if (action.payload.isDefault) {
                state.addresses.forEach(addr => addr.isDefault = false);
            }
            
            state.addresses.push(action.payload);
        
        },


        deleteAddress: (state, action) => {
            const targetId = action.payload.id ?? action.payload;
            state.addresses = state.addresses.filter((addr) => addr.id !== targetId);
        }
    }
});

export const { updateAddress, addAddress, deleteAddress,setAddresses } = addressSlice.actions;

export default addressSlice.reducer;
