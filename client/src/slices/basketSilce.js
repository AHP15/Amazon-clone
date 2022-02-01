import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: JSON.parse(localStorage.getItem("basket")) || [],
    shippingInfo:JSON.parse(localStorage.getItem("shippingInfo")) || {
        address:"",
        city:"",
        country:"",
        pinCode:0,
        phoneNo:0,
        state:"",
    },
    stripeApiKey:null,
};

export function getTotal(items){
    let total = 0;
    items.forEach(item =>{
        total += item.price * item.quantity
    });
    return total;
}

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers:{
        ADD_ITEM(state, action){
            state.items = [...state.items, action.payload]
            localStorage.setItem("basket", JSON.stringify(state.items));
        },
        REMOVE_ITEM(state, action){
            state.items = state.items.filter(item => item._id !== action.payload);
            localStorage.setItem("basket", JSON.stringify(state.items));
        },
        SET_QUANTITY(state, action){
            state.items = state.items.map(item => {
                if(item._id === action.payload.id){
                    return {
                        ...item,
                        quantity:action.payload.quantity
                    };
                }
                return item;
            });
            localStorage.setItem("basket", JSON.stringify(state.items));
        },
        SET_SHIPPING_INFO(state, action){
            state.shippingInfo = action.payload;
            localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
        },
        SET_STRIPE_API_KEY(state, action){
            state.stripeApiKey = action.payload;
        },
    }
});

export const {
    ADD_ITEM,
    REMOVE_ITEM,
    SET_QUANTITY,
    SET_SHIPPING_INFO,
    SET_STRIPE_API_KEY,
} = basketSlice.actions;

export const selectBasket = state => state.basket;
export  default basketSlice.reducer;