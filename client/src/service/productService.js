import axios from "axios";
import { 
    REQUEST_PRODUCTS,
    REQUEST_PRODUCTS_SUCCESS,
    REQUEST_PRODUCTS_FAIL
} from "../slices/productSlice";

export async function getAllProducts(dispatch,keyword,page, min_price, max_price, category){
    dispatch(REQUEST_PRODUCTS());
    let url = `/api/v1/products`;

    try{
        const { data } = await axios.get(url);
        dispatch(REQUEST_PRODUCTS_SUCCESS(data.products));
    }catch(err){
        dispatch(REQUEST_PRODUCTS_FAIL(err.message));
    }
}

export async function getproductDetails(id){
    let url = `/api/v1/product/${id}`
    try{
        const { data } = await axios.get(url);
        return data;
    }catch(err){
        return err.response.data.message
    }
}

export async function submitReview(review){
    let url = "/api/v1/review";
    const config = { headers: { "Content-Type": "application/json" } };

    try{
        const { data } = await axios.put(url, {
            productId:review.id,
            rating:review.rating,
            name:review.name,
            comment:review.comment
        }, config);
        return data;
    }catch(err){
        return err.response.data.message
    }
}