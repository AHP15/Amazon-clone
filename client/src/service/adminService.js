import axios from "axios";
import {
    ADMIN_REQUEST_PRODUCT,
    ADMIN_REQUEST_PRODUCT_SUCCESS,
    ADMIN_REQUEST_PRODUCT_FAIL,
    ADMIN_REQUEST_USERS_SUCCESS,
    ADMIN_REQUEST_USERS_FAIL,
    ADMIN_REQUEST_REVIEWS_SUCCESS,
    ADMIN_REQUEST_REVIEWS_FAIL
} from "../slices/adminSlice";


export async function getAdminProducts(dispatch){

    const url = "/api/v1/admin/products";
    dispatch(ADMIN_REQUEST_PRODUCT());
    try{
        const {data} = await axios.get(url);
        dispatch(ADMIN_REQUEST_PRODUCT_SUCCESS(data.products));
    }catch(err){
        dispatch(ADMIN_REQUEST_PRODUCT_FAIL(err.response.data.message));
    }
}

export async function createProduct(product){
    const url = "/api/v1/admin/product/new";
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    try{
        const { data } = await axios.post(url, product, config);
        return data;
    }catch(err){
        return err.response.data.message;
    }
}

export async function updateProduct(product_id, productData){
    const url = `/api/v1/admin/product/${product_id}`;
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    try{
        const { data } = await axios.put(url, productData, config);
        return data;
    }catch(err){
        return err.response.data.message;
    }
}

export async function getAdminUsers(dispatch){
    const url = "/api/v1/admin/users";

    try{
        const { data } = await axios.get(url);
        if(data.success){
            dispatch(ADMIN_REQUEST_USERS_SUCCESS(data.users));
        }else{
            dispatch(ADMIN_REQUEST_USERS_FAIL(data.message))
        }
    }catch(err){
        dispatch(ADMIN_REQUEST_USERS_FAIL(err.message));
    }
}

export async function getAllReviews(dispatch){
    const url = "/api/v1/admin/reviews";

    try{
        const { data } = await axios.get(url);
        if(data.success){
            dispatch(ADMIN_REQUEST_REVIEWS_SUCCESS(data.reviews));
        }
    }catch(err){
        dispatch(ADMIN_REQUEST_REVIEWS_FAIL(err.response.data.message || err.message));
    }
}

