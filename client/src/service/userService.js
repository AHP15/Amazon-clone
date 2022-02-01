import axios from "axios";
import { SET_STRIPE_API_KEY } from "../slices/basketSilce";
import {
    LOGING_REQUEST,
    LOGING_REQUEST_SUCCESS,
    LOGING_REQUEST_FAIL,
    REGISTER_REQUEST,
    REGISTER_REQUEST_SUCCESS,
    REGISTER_REQUEST_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SECCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REQUEST_UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
} from "../slices/userSlice";

export async function login(dispatch, email, password){
    let url = "/api/v1/auth/login";
    dispatch(LOGING_REQUEST());

    try{
        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
            url,
          { email, password },
          config
        );
        dispatch(LOGING_REQUEST_SUCCESS(data.user));
    }catch(err){
        dispatch(LOGING_REQUEST_FAIL(err.response.data.message));
    }
}

export async function register(dispatch, userData, avatar){

    const url = "/api/v1/auth/register";
    dispatch(REGISTER_REQUEST());

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    try{
        const { data } = await axios.post(url,userData, config);
        dispatch(REGISTER_REQUEST_SUCCESS(data.user));
    }catch(err){
        dispatch(REGISTER_REQUEST_FAIL(err.response.data.message));
    }
}

export async function logout(dispatch){
    const url = "/api/v1/auth/logout";

    try{
        const { data } = await axios.get(url);
        console.log(data);
        dispatch(LOGOUT_SUCCESS());
    }catch(err){
        dispatch(LOGOUT_FAIL(err.response.data.message));
    }
}

export async function getUserDetail(dispatch){
    let url = "/api/v1/auth/me";
    dispatch(LOAD_USER_REQUEST())

    try{
        const { data } = await axios.get(url);
        dispatch(LOAD_USER_SECCESS(data.user));
    }catch(err){
        let MSG = err.response.data.message;
        if(MSG === "No token is provided!!"){
            MSG = "Loading your profile failed please make a new login request"
        }
        dispatch(LOAD_USER_FAIL(MSG));
    }
}

export async function updateProfile(dispatch, userData){
    dispatch(REQUEST_UPDATE_PROFILE());
    let url = "/api/v1/auth/me/update";
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    try{
        const { data } = await axios.put(url, userData, config);
        if(data.success){
            dispatch(UPDATE_PROFILE_SUCCESS(data.user));
            return data;
        }
    }
    catch(err){
        dispatch(UPDATE_PROFILE_FAIL(err.response.data.message));
    }
}

export async function getStripeApiKey(dispatch){
    let url = "/api/v1/stripe_api_key";

    try{
        const { data } = await axios.get(url);
        dispatch(SET_STRIPE_API_KEY(data.apiKey));
    }catch(err){
        dispatch(LOAD_USER_FAIL(err.message));
    }
}

export async function getClientSecret(paymentData){
    let url = "/api/v1/payment/process";
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
    };

    try{
        const { data } = await axios.post(url, paymentData,config);
        if(data.success){
            return {
                secret:data.client_secret
            };
        }else{
            return new Error(`${data.message}`);
        }
    }catch(err){
        return err.message;
    }
}

export async function forgotPassword(email){
    let url = "/api/v1/auth/password/forgot";

    const config = {
        headers: {
          "Content-Type": "application/json",
        },
    };

    try{
        const { data } = await axios.post(url, {email}, config);
        return data;
    }catch(err){
        return err.response.data.message || err.message;
    }
}

export async function resetPassword(PasswordData, token){
    let url = `/api/v1/auth/password/reset/${token}`;

    const config = {
        headers: {
          "Content-Type": "application/json",
        },
    };

    try{
        const { data } = await axios.put(url, PasswordData, config);
        return data;
    }catch(err){
        console.log(err);
        return err?.response?.data?.message || err.message;
    }
}

export async function changePassword(passwordData){
    let url = "/api/v1/auth/password/update";
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
    };

    try{
        const { data } = await axios.put(url, passwordData, config);
        return data;
    }catch(err){
        console.log(err);
        return err?.response?.data?.message || err.message;
    }
}