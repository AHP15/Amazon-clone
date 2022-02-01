import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    loading: false,
    products:[],
    error:null,
};

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        REQUEST_PRODUCTS(state){
           state.loading = true;
           state.error = null;
           state.products = [];
           state.selectedProduct = null;
        },
        REQUEST_PRODUCTS_SUCCESS(state, action){
            state.loading = false;
            state.error = null;
            state.products = [...action.payload];
            state.selectedProduct = null;
        },
        REQUEST_PRODUCTS_FAIL(state, action){
            state.loading = false;
            state.error = action.payload;
            state.products = [];
            state.selectedProduct = null;
        },
        CLEAR_PRODUCT_ERROR(state){
            state.error = null;
        },
    }
});

export const {
    REQUEST_PRODUCTS,
    REQUEST_PRODUCTS_SUCCESS,
    REQUEST_PRODUCTS_FAIL,
    CLEAR_PRODUCT_ERROR,
} = productSlice.actions;

export const selectProducts = state => state.product;
export  default productSlice.reducer;