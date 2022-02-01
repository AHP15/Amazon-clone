import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products:[],
    users:[],
    reviews:[],
    productsError:null,
    usersError: null,
    reviewsError: null,
    loading:false,
    editProduct:null,
    totalAmount:0,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers:{
        ADMIN_REQUEST_PRODUCT(state){
            state.loading = true;
            state.productsError = null;
        },
        ADMIN_REQUEST_PRODUCT_SUCCESS(state, action){
            state.loading = false;
            state.products = [...action.payload];
            state.productsError = null;
        },
        ADMIN_REQUEST_PRODUCT_FAIL(state, action){
            state.loading = false;
            state.productsError = action.payload;
        },
        SET_EDIT_PRODUCT(state, action){
            state.editProduct = action.payload;
        },
        CLEAR_EDIT_PRODUCT(state){
            state.editProduct = null;
        },
        SET_TOTAL_AMOUNT(state, action){
            state.totalAmount = action.payload;
        },
        ADMIN_REQUEST_USERS_SUCCESS(state, action){
            state.users = action.payload;
        },
        ADMIN_REQUEST_USERS_FAIL(state, action){
            state.usersError = action.payload;
        },
        ADMIN_REQUEST_REVIEWS_SUCCESS(state, action){
            state.reviews = action.payload;
        },
        ADMIN_REQUEST_REVIEWS_FAIL(state, action){
            state.reviewsError = action.payload
        },
    }
});

export const {
    ADMIN_REQUEST_PRODUCT,
    ADMIN_REQUEST_PRODUCT_SUCCESS,
    ADMIN_REQUEST_PRODUCT_FAIL,
    SET_EDIT_PRODUCT,
    CLEAR_EDIT_PRODUCT,
    SET_TOTAL_AMOUNT,
    ADMIN_REQUEST_USERS_SUCCESS,
    ADMIN_REQUEST_USERS_FAIL,
    ADMIN_REQUEST_REVIEWS_SUCCESS,
    ADMIN_REQUEST_REVIEWS_FAIL
} = adminSlice.actions;

export const selectAdmin = state => state.admin;
export  default adminSlice.reducer;