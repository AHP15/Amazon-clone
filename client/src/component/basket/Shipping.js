import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBasket, SET_SHIPPING_INFO } from "../../slices/basketSilce";
import Input from "../user/Input";
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PinDropIcon from '@mui/icons-material/PinDrop';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { Country, State }  from 'country-state-city';
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Shipping({nextStep}){

    const { shippingInfo } = useSelector(selectBasket);
    const [shipping, setShipping] = useState({
        address:shippingInfo.address,
        city:shippingInfo.city,
        country:shippingInfo.country,
        pinCode:shippingInfo.pinCode,
        phoneNo:shippingInfo.phoneNo,
        state:shippingInfo.state
    });
    const [validationErr, setValidationErr] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleInvalid(e){
        setValidationErr(err => {
            if(err){
                return err + ` and Invalid ${e.target.name}`;
            }
            return `Invalid ${e.target.name}`;
        })
    }
    function handleChange(e){
        setShipping(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value
        }));
    }

    function handleSubmit(e){
        e.preventDefault();

        dispatch(SET_SHIPPING_INFO(shipping));
        nextStep();
    }

    return (
        <div style={{
            width:"90%",
            maxWidth:"400px",
            margin:"10px auto",
            marginBottom:"50px"
        }} className="shipping">
            <form onSubmit={handleSubmit}>
                <Input
                   icon={<HomeIcon />}
                   type="text"
                   name="address"
                   placeHolder="Your Adress"
                   handleInvalid={handleInvalid}
                   handleChange={handleChange}
                   value={shipping.address}
                />
                <Input
                   icon={<LocationCityIcon />}
                   type="text"
                   name="city"
                   placeHolder="Your City"
                   handleInvalid={handleInvalid}
                   handleChange={handleChange}
                   value={shipping.city}
                />
                <Input
                   icon={<PinDropIcon />}
                   type="number"
                   name="pinCode"
                   placeHolder="Pin Code"
                   handleInvalid={handleInvalid}
                   handleChange={handleChange}
                   value={shipping.pinCode}
                />
                <Input
                   icon={<PhoneIcon />}
                   type="number"
                   name="phoneNo"
                   placeHolder="Phone Number"
                   handleInvalid={handleInvalid}
                   handleChange={handleChange}
                   value={shipping.phoneNo}
                />

                <div className='input_container'>
                    <p><PublicIcon /></p>
                    <select
                       value={shipping.country}
                       required
                       name="country"
                       onChange={handleChange}
                       onInvalid={handleInvalid}
                    >
                        <option value="">Country</option>
                        {
                            Country.getAllCountries().map(item => (
                                <option key={item.isoCode} value={item.isoCode}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className='input_container'>
                  <p><TransferWithinAStationIcon /></p>

                  <select
                    value={shipping.state}
                    required
                    name="state"
                    onChange={handleChange}
                    onInvalid={handleInvalid}
                  >
                      <option value="">State</option>
                      {
                        shipping.country && State.getStatesOfCountry(shipping.country)
                        .map(item => (
                            <option key={item.isoCode} value={item.isoCode}>
                                {item.name}
                            </option>
                        ))
                      }
                  </select>
                </div>

                <div>
                    <p onClick={() => {navigate("/basket")}} style={{
                        backgroundColor:"grey",
                        borderRadius:"10px",
                        width:"100px",
                        textAlign:"center",
                        padding:"5px",
                        cursor:"pointer"
                    }}>Back</p>
                  <button className="Next_btn" type="submit">Confirm Order</button>
                </div>
            </form>

            {validationErr && (
                <Alert
                onClose={() =>{setValidationErr(null)}}
                className="alert_form" 
                severity="error"
                >
                    {validationErr}
                </Alert>
            )}
        </div>
    );
}

export default Shipping;