import { useSelector } from "react-redux";
import { selectBasket } from "../../slices/basketSilce";
import { selectUser } from "../../slices/userSlice";
import OrderItem from "./OrderItem";
import "../../styles/basket/ConfirmOrder.css"


function ConfirmOrder(){
    const { shippingInfo, items } = useSelector(selectBasket);
    const {info} = useSelector(selectUser);
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    return (
        <div className="confirm_order">
            <div className="shipping_info">
                <h1>Shipping Info</h1>
                <p>Name: <span>{info?.name}</span></p>
                <p>Phone: <span>{shippingInfo.phoneNo}</span></p>
                <p>Address: <span>{address}</span></p>
            </div>
            <div className="order_ietms">
                <h1>Your Order Items:</h1>
                {items.map(item => (
                    <OrderItem key={item._id} item={item} />
                ))}
            </div>
        </div>
    );
}

export default ConfirmOrder;