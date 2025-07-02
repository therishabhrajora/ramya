import { createSlice } from "@reduxjs/toolkit";


const tokenFromLocalStorage=localStorage.getItem("token");
const userFromLocalStorage=localStorage.getItem("user");

const authSlice=createSlice({
    name:"auth",
    initialState:{
        token:tokenFromLocalStorage || null,
        user:userFromLocalStorage ? JSON.parse(userFromLocalStorage):null,
        isLoggedIn:!!tokenFromLocalStorage,
    },

    reducers:{
        loginSuccess:(state,action)=>{
            const {token , user}=action.payload;
            state.token=token,
            state.user=user,
            state.isLoggedIn=true;

            localStorage.setItem("token",token);
            localStorage.setItem("user",JSON.stringify(user));

        },

        logout:(state)=>{
            state.token=null;
            state.user=null;
            state.isLoggedIn=false;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }
});

export const {loginSuccess,logout}=authSlice.actions;
export default authSlice.reducer;
