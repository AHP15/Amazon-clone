import "../../styles/basket/OrderItem.css";

function OrderItem({item}){

    return (
        <div className="order_item">
            <div>
                <img src={item.images[0].url} alt={item.name} />
            </div>
            <p className="OrderItem_name">{item.name}</p>
            <p><span>{item.quantity} x ${item.price}</span> = ${item.price*item.quantity}</p>
        </div>
    );
}

export default OrderItem;