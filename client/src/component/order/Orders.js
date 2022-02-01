import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../MetaData";
import { getUserOrders } from "../../service/orderService";
import { selectOrders } from "../../slices/orderSlice";
import Header from "../home/Header";
import Order from "./Order";


function Orders(){
    const { userOrders } = useSelector(selectOrders);
    const dispatch = useDispatch();
    useEffect(() =>{
        if(!userOrders){
            getUserOrders(dispatch)
        }
    }, [dispatch]);
    return (
        <div>
            <MetaData title="orders" />
            <Header />
            <div style={{marginTop:"100px"}}>
                {userOrders?.length > 0 && (userOrders.map(order => (
                    <Order order={order} />
                )))}
            </div>
        </div>
    );
}

export default Orders;