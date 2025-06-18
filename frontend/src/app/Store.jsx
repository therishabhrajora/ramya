import { configureStore } from '@reduxjs/toolkit';
import navbarReducer from '../slices/NavBarSlice';

export const store=configureStore({
    reducer:{
       navBar:navbarReducer,
    }
})