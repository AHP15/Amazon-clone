import Header from "../home/Header";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from "react-router-dom";
import MetaData from "../../MetaData";


function Success(){
    
    const style = {
        margin:"65px auto",
        backgroundColor:"white",
        height:"300px",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
    };
    return (
        <div>
            <MetaData title="order created" />
            <Header />
            <div style={style}>
                
                <h1>
                    <CheckCircleIcon
                       fontSize="large"
                       style={{color:"rgb(255, 187, 0)"}}
                    /> Your Order has been Placed successfully</h1>
                <Link style={{
                    textDecoration:"none",
                    backgroundColor:"rgb(255, 187, 0)",
                    padding:"10px 40px",
                    color:"black",
                    marginTop:"20px",
                    borderRadius:"15px"
                }} to="/orders">Go To My Orders</Link>
            </div>
        </div>
    );
}

export default Success;