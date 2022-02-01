import Header from "../home/Header";
import Currency from 'react-currency-formatter';
import { useSelector } from "react-redux";
import { selectBasket, getTotal } from "../../slices/basketSilce";
import "../../styles/basket/Basket.css";
import BasketItem from "./BasketItem";
import { selectUser } from "../../slices/userSlice";
import {useNavigate } from "react-router-dom";
import MetaData from "../../MetaData";

function Basket(){
    const {  items } = useSelector(selectBasket);
    const { isLoggedIn } = useSelector(selectUser);
    const navigate = useNavigate();

    return (
        <div className="basket">
            <MetaData title={`${items.length} items`} />
            <Header />
            <main className="basket_container">
                <section className="basket_left">
                    <h1>{items.length > 0?"Shopping Cart":"Basket Empty"}</h1>
                    {
                        items.map(item => (
                            <BasketItem key={item._id} item={item} />
                        ))
                    }
                </section>
                <section className="basket_right">
                    <p>
                       Subtotal
                       <strong><Currency quantity={getTotal(items)} currency="USD"/></strong>
                    </p>
                    <button
                        onClick={() =>{navigate("/ckeckout")}}
                        disabled={!isLoggedIn || items.length < 1}
                    >
                        {
                            isLoggedIn? "Proceed To Checkout":"Login to proceed to checkout"
                        }
                    </button>
                </section>
            </main>
        </div>
    );
}

export default Basket;