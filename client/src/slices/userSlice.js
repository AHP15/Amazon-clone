import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    info:null,
    isLoggedIn:JSON.parse(localStorage.getItem("loggedIn"))? true:false,
    loading: false,
    error:null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        LOGING_REQUEST(state){
            state.loading = true;
        },
        LOGING_REQUEST_SUCCESS(state, action){
            state.loading = false;
            state.isLoggedIn = true;
            state.info = action.payload;
            localStorage.setItem("loggedIn" ,"true");
        },
        LOGING_REQUEST_FAIL(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        REGISTER_REQUEST(state){
            state.loading = true;
        },
        REGISTER_REQUEST_SUCCESS(state, action){
            state.loading = false;
            state.isLoggedIn = true;
            state.info = action.payload;
            state.error = null;
            localStorage.setItem("loggedIn" ,"true");
        },
        REGISTER_REQUEST_FAIL(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        LOAD_USER_REQUEST(state){
            state.loading = true;
        },
        LOAD_USER_SECCESS(state, action){
            state.isLoggedIn = true;
            state.info = action.payload;
            state.loading = false;
        },
        LOAD_USER_FAIL(state, action){
            state.error = action.payload;
            state.loading = false;
        },
        LOGOUT_SUCCESS(state){
            state.loading = false;
            state.isLoggedIn = false;
            state.info = null;
            state.error = null;
            localStorage.removeItem("loggedIn");
        },
        LOGOUT_FAIL(state, action){
            state.error = action.payload;
        },
        CLEAR_USER_ERROR(state){
            state.error = null;
        },
        REQUEST_UPDATE_PROFILE(state){
            state.loading = true;
        },
        UPDATE_PROFILE_SUCCESS(state, action){
            state.loading = false;
            state.info = action.payload;
        },
        UPDATE_PROFILE_FAIL(state, action){
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    LOGING_REQUEST,
    LOGING_REQUEST_SUCCESS,
    LOGING_REQUEST_FAIL,
    REGISTER_REQUEST,
    REGISTER_REQUEST_SUCCESS,
    REGISTER_REQUEST_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SECCESS,
    LOAD_USER_FAIL,
    CLEAR_USER_ERROR,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REQUEST_UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
} = userSlice.actions;

export const selectUser = state => state.user;
export  default userSlice.reducer;