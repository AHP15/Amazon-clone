import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice.js';
import productReducer from "./slices/productSlice.js";
import adminReducer from "./slices/adminSlice.js";
import basketReducer from "./slices/basketSilce.js";
import orderReducer from "./slices/orderSlice.js";

export const store = configureStore({
    reducer : {
        user:userReducer,
        product: productReducer,
        admin:adminReducer,
        basket:basketReducer,
        order:orderReducer,
    }
});