import axios from "axios";
import {
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
} from "../slices/orderSlice";
import { SET_TOTAL_AMOUNT } from "../slices/adminSlice";

export async function createOrder(dispatch, order){
    dispatch(REQUEST_CREATE_ORDER());
    let url = "/api/v1/order/new";
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
    }

    try{
        const { data } = await axios.post(url, order, config);
        if(data.success){
            dispatch(REQUEST_CREATE_ORDER_SUCCESS(data.order));
            localStorage.removeItem("basket");
        }else{
            dispatch(REQUEST_CREATE_ORDER_FAIL(data.message));
        }
    }catch(err){
        dispatch(REQUEST_CREATE_ORDER_FAIL(err.message));
    }
}

export async function getUserOrders(dispatch){
    dispatch(REQUEST_USER_ORDERS());
    let url = "/api/v1/orders/me";

    try{
        const { data } = await axios.get(url);
        if(data.success){
            dispatch(REQUEST_USER_ORDERS_SECCUSS(data.orders));
        }else{
            dispatch(REQUEST_USER_ORDERS_FAIL(data.message));
        }
    }catch(err){
        dispatch(REQUEST_USER_ORDERS_FAIL(err.response.data.message));
    }
}

export async function getAllOrders(dispatch){
    dispatch(REQUEST_ADMIN_ORDERS());
    let url = "/api/v1/admin/orders";

    try{
        const {data} = await axios.get(url);

        if(data.success){
            dispatch(REQUEST_ADMIN_ORDERS_SECCUSS(data.orders));
            dispatch(SET_TOTAL_AMOUNT(Math.round(data.totalAmount)));
            console.log(data);
        }else{
            dispatch(REQUEST_ADMIN_ORDERS_FAIL(data.message));
        }
    }catch(err){
        dispatch(REQUEST_ADMIN_ORDERS_FAIL(err.message));
    }
}