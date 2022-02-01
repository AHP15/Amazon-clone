import { 
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements, 
} from "@stripe/react-stripe-js";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import MetaData from "../../MetaData";
import { useState } from "react";
import { getClientSecret } from "../../service/userService";
import { useDispatch, useSelector } from "react-redux";
import { selectBasket } from "../../slices/basketSilce";
import { selectUser } from "../../slices/userSlice";
import { createOrder } from "../../service/orderService";
import { useNavigate } from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert } from "@mui/material";

function Payment({prevStep}){
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const paymentData = {
        amount:Math.round(orderInfo.total * 100)
    };
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { shippingInfo, items } = useSelector(selectBasket);
    const { info } = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const orderItems = items.map(item =>({
        name:item.name,
        price:item.price,
        quantity:item.quantity,
        image:item.images[0].url,
        product:item._id
    }));
    const order = {
        shippingInfo,
        orderItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.total,
    };

    const stripe = useStripe();
    const elements = useElements();

    async function handleSubmit(e){
        e.preventDefault();
        if(loading) return;
        setLoading(true);

        const response = await getClientSecret(paymentData);

        if (!stripe || !elements) return;

        if(response.secret){
            try{
                const result = await stripe.confirmCardPayment(response.secret, {
                    payment_method: {
                      card: elements.getElement(CardNumberElement),
                      billing_details: {
                        name: info?.name,
                        email: info?.email,
                        address: {
                          line1: shippingInfo.address,
                          city: shippingInfo.city,
                          state: shippingInfo.state,
                          postal_code: shippingInfo.pinCode,
                          country: shippingInfo.country,
                        },
                      },
                    },
                });
    
                if(result.error){
                    setError(result.error);
                    setLoading(false);
                }
                else{
                    if(result.paymentIntent.status === "succeeded"){
                        order.paymentInfo = {
                            id:result.paymentIntent.id,
                            status:result.paymentIntent.status,
                        }
                        createOrder(dispatch,order);
                        navigate("/success")
                    }else{
                        setError("Oops Payment failed !!");
                        setLoading(false);
                    }
                }
            }catch(err){
                setError(err.message);
                setLoading(false);
            }
        }else{
            setError("Something qoes wrong!");
            setLoading(false);
        }
    }

    const style = {
        backgroundColor:"rgb(255, 187, 0)",
        color:"black",
        paddingLeft:"20px"
    };

    return (
        <div>
            <MetaData title="Payment" />

            <form style={{
                width:"100%",
                maxWidth:"400px",
                margin:"10px auto"
            }} onSubmit={handleSubmit}>
                <h1 style={{
                    textAlign:"center",
                    padding:"10px"
                }}>Card Info</h1>
                <div className='input_container'>
                    <p><CreditCardIcon /></p>
                    <CardNumberElement className="paymentInput"/>
                </div>
                <div className='input_container'>
                    <p><EventIcon /></p>
                    <CardExpiryElement className="paymentInput" />
                </div>
                <div className='input_container'>
                    <p><VpnKeyIcon /></p>
                    <CardCvcElement className="paymentInput" />
                </div>

                <LoadingButton
                    loading={loading}
                    loadingPosition="start"
                    className="Next_btn"
                    type="submit"
                    style={style}
                >
                    {`Pay $${orderInfo.total}`}
                </LoadingButton>
            </form>
            {error && (
               <Alert
                  onClose={() =>setError(null)}
                  className="alert_form" 
                  severity="error">{error}</Alert>
            )}
        </div>
    );
}

export default Payment;