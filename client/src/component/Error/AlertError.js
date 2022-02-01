import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_PRODUCT_ERROR, selectProducts } from "../../slices/productSlice";
import { CLEAR_USER_ERROR, selectUser } from "../../slices/userSlice";
import { Alert } from '@mui/material';

function AlertError({error}) {
    
    const dispatch = useDispatch(); 
    const {error: productError} = useSelector(selectProducts);
    const {error: userError } = useSelector(selectUser);
    function handleClose(){
        if(productError){
            dispatch(CLEAR_PRODUCT_ERROR())
        }else if(userError){
            dispatch(CLEAR_USER_ERROR())
        }
    }

    return (
        <div className="alert_error">
            <Alert
                onClose={handleClose}
                severity="error"
                className="alert_error"
            >{error}</Alert>
        </div>
    )
}

export default AlertError;
