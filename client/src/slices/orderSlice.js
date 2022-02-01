import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userOrders:null,
    allArders:[],
    loading:false,
    error:null
};

const orderSlice = createSlice({   
    initialState,
    name:"order",
    reducers:{
        REQUEST_USER_ORDERS(state){
            state.loading = true;
        },
        REQUEST_USER_ORDERS_SECCUSS(state, action){
            state.loading = false;
            state.userOrders = action.payload;
        },
        REQUEST_USER_ORDERS_FAIL(state, action){
            state.error = action.payload;
            state.loading = false;
        },
        REQUEST_ADMIN_ORDERS(state, action){
            state.loading = true;
        },
        REQUEST_ADMIN_ORDERS_SECCUSS(state, action){
            state.loading = false
            state.allArders = action.payload;
        },
        REQUEST_ADMIN_ORDERS_FAIL(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        REQUEST_CREATE_ORDER(state){
            state.loading = true;
        },
        REQUEST_CREATE_ORDER_SUCCESS(state, action){
            state.loading = false;
            state.userOrders.push(action.payload);
        },
        REQUEST_CREATE_ORDER_FAIL(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_ERROR(state){
            state.error = null;
        }
    }
});


export const {
    REQUEST_USER_ORDERS,
    REQUEST_USER_ORDERS_SECCUSS,
    REQUEST_USER_ORDERS_FAIL,
    REQUEST_ADMIN_ORDERS,
    REQUEST_ADMIN_ORDERS_SECCUSS,
    REQUEST_ADMIN_ORDERS_FAIL,
    REQUEST_CREATE_ORDER,
    REQUEST_CREATE_ORDER_SUCCESS,
    REQUEST_CREATE_ORDER_FAIL,
    CLEAR_ERROR,
} = orderSlice.actions;

export const selectOrders = state => state.order;

export default orderSlice.reducer;