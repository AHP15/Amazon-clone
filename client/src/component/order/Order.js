import { width } from "@mui/system";

function Order({order}){

    const styleImages = {
        display:"flex",
        alignItem:"center",
        height:"150px",
        width:"100%",
        overflowX:"scroll",
    };
    const styleImageContainer = {
        width:"100px",
        height:"90%",
    };

    return (
        <div style={{
            margin:"20px auto",
            width:"100%",
            maxWidth:"500px",
            boxShadow:"1px -1px 10px black",
            borderRadius:"20px",
            padding:"20px",
            backgroundColor:"white"
        }}>
            <div style={styleImages}>
            {
                order.orderItems.map(item => (
                    <div style={styleImageContainer} >
                        <img
                           src={item.image}
                           alt={item.name}
                           style={{width:"100%", height:"100%", objectFit:"contain"}}
                        />
                    </div>
                ))
            }
            </div>
            <div style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                padding:"20px"
            }}>
                <p>Price ${order.totalPrice}</p>
                <p>{String(order.createdAt.slice(0, 10))}</p>
            </div>
        </div>
    );
}

export default Order;