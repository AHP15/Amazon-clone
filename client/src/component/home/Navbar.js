import "../../styles/home/Navbar.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import { useState } from "react";
import { logout } from "../../service/userService";
import { selectBasket } from "../../slices/basketSilce";

function Navbar(){
    
    const navigate = useNavigate();
    const {isLoggedIn, info} = useSelector(selectUser);
    const { items } = useSelector(selectBasket);
    const [showSnniper, setShowSnniper] = useState(false);
    function handleLogin(){
        if(!isLoggedIn){
            navigate("/login");
        }
    }

    function handleHover(){
        setShowSnniper(true);
    }
    function handleLeave(){
        setShowSnniper(false);
    }

    function handleOrderClick(){
        if(!isLoggedIn){
            navigate("/login");
        }else{
            navigate("/orders");
        }
    }

    return (
        <nav className="navbar">

            <div onMouseLeave={handleLeave} onMouseMove={handleHover} onClick={handleLogin}>
                <h5>Hello, {isLoggedIn? info?.name:"Guest"}</h5>
                {!isLoggedIn && <h4>singIn</h4>}
                {showSnniper && <UserSnniper />}
            </div>

            <div onClick={handleOrderClick}>
                <h5>Returns</h5>
                <h4>& Orders</h4>
            </div>

            <div onClick={() =>{navigate("/basket")}}>
                <h5><AddShoppingCartIcon /></h5>
                <h4 style={{ textAlign: 'center'}}>{items.length}</h4>
            </div>

        </nav>
    );
}

function UserSnniper(){
    const { isLoggedIn, info } = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout(){
        logout(dispatch);
    }

    return (
        <div className="user_options">
            {isLoggedIn && (
              <p onClick={() =>{navigate("/user/profile")}}>Profile</p>
            )}
            {info?.role === "admin" && (
                <p onClick={() =>{navigate("/admin/dashboard")}}>Dashboard</p>
            )}
            {!isLoggedIn && (
                <p onClick={() =>{navigate("/login")}}>Login</p>
            )}
            {isLoggedIn && (
                <p onClick={handleLogout}>Logout</p>
            )}
        </div>
    );
}

export default Navbar;
