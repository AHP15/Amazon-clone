import "../../styles/home/Header.css";
import Navbar from "./Navbar";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

function Header(){
    const navigate = useNavigate()
    return (
        <header className="header">
            <div onClick={() =>{navigate("/")}} className="logo">
                <img
                  src='https://links.papareact.com/f90'
                  alt="amazon logo"
                />
            </div>

            <form>
                <input type="text"/>
                <button type="submit">
                    <SearchIcon />
                </button>
            </form>

            <div className="header_nav">
                <Navbar />
            </div>
        </header>
    );
}

export default Header;