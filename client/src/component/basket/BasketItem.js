import { useDispatch } from "react-redux";
import { REMOVE_ITEM, SET_QUANTITY } from "../../slices/basketSilce";
import Currency from 'react-currency-formatter';
import "../../styles/basket/BasketItem.css";
import { useState } from "react";
import {useNavigate } from "react-router-dom";


function BasketItem({item}){
    
    const [itemRemoved, setItemRemoved] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    function handleRemoveItem(){
        setItemRemoved(true);
        setTimeout(() =>{
            dispatch(REMOVE_ITEM(item._id));
        }, 700);
    }

    return (
        <div className={`basket_item ${itemRemoved? "removed":""}`}>
            <div onClick={() =>navigate(`/product/${item._id}`)} className="item_image">
                <img src={item.images[0].url} alt={item.name} />
            </div>

            <div className="item_info">
              <h1>{item.name}</h1>
              <p style={{
                  color:item.stock > 1? "green":"red"
              }}>{item.stock > 1? "InStock":"OutStock"}</p>
              
              <div className="product_quantity">
                  <button onClick={() =>{ dispatch(SET_QUANTITY({
                        quantity:item.quantity-1,
                        id:item._id,
                  }))}}>-</button>
                  <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>{
                        dispatch(SET_QUANTITY({
                            quantity:e.target.value,
                            id:item._id
                        }))
                      }}
                    />
                  <button onClick={() =>{ dispatch(SET_QUANTITY({
                      quantity:item.quantity+1,
                      id:item._id
                  }))}}>+</button>
              </div>
            </div>

            <div className="remove_item">
                  <h3><Currency quantity={item.price} currency="USD"/></h3>
                  <button
                    onClick={handleRemoveItem}
                   >Remove from basket</button>
              </div>
        </div>
    );
}

export default BasketItem;