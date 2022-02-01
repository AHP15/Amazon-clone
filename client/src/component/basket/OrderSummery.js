import Currency from "react-currency-formatter";
import { useSelector } from "react-redux";
import { getTotal, selectBasket } from "../../slices/basketSilce";
import "../../styles/basket/OrderSummery.css";

function OrderSummery({prevStep,nextStep}){
    const { items } = useSelector(selectBasket);
    const subtotal = getTotal(items);
    const shippingCharge = subtotal > 1000? 0:150;
    const tax = subtotal * 0.15;
    const total = subtotal + shippingCharge + tax;

    function handlePayment(){
        const data = {
            subtotal,
            shippingCharge,
            tax,
            total,
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        nextStep();
    }

    return (
        <div className="order_summery">
            <h1>Order Summery</h1>
            <div>
                <p className="order_title">Subtotal</p>
                <p><Currency quantity={subtotal} currency="USD"/></p>
            </div>
            <div>
                <p className="order_title">Shipping Charges</p>
                <p><Currency quantity={shippingCharge} currency="USD"/></p>
            </div>
            <div className="tax">
                <p className="order_title">GST</p>
                <p><Currency quantity={tax} currency="USD"/></p>
            </div>
            <div className="total">
                <p className="order_title">Total</p>
                <p><Currency quantity={total} currency="USD"/></p>
            </div>
            <p onClick={() =>{prevStep()}} style={{
                backgroundColor:"grey",
                borderRadius:"10px",
                width:"100px",
                textAlign:"center",
                padding:"5px",
                cursor:"pointer"
            }}>Back</p>
            <button
               onClick={handlePayment}
               className="Next_btn"
            >Proceed To Payment</button>
        </div>
    );
}

export default OrderSummery;
