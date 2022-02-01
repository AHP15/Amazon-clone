import MetaData from "../../MetaData";
import Header from "../home/Header";
import Input from "./Input";
import EmailIcon from '@mui/icons-material/Email';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useEffect, useState } from "react";
import "../../styles/user/UpdateProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import { Alert } from "@mui/material";
import { updateProfile } from "../../service/userService";
import { useNavigate } from "react-router-dom";


function UpdateProfile(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [validationError, setValidationError] = useState(null);
    const { loading, error, isLoggedIn, info } = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    function handleInvalid(e){
        setValidationError(err => {
            if(err){
                return err + ` and Invalid ${e.target.name}`;
            }
            return `Invalid ${e.target.name}`;
        })
    }
    function handleChange(e){
        if(e.target.name === "avatar"){
            const file = e.target.files[0];
            setAvatar(file);
            const reader = new FileReader();
            reader.onload = () =>{
                if (reader.readyState === 2) {
                    setImagePreview(reader.result);
                }
            }
            reader.readAsDataURL(file);
        }
        else if(e.target.name === "name"){
            setName(e.target.value);
        }else{
            setEmail(e.target.value);
        }

        setValidationError(null);
    }

    useEffect(() =>{
        if(isLoggedIn){
            setName(info.name);
            setEmail(info.email);
            setImagePreview(info.avatar.url);
        }
    }, [isLoggedIn, info]);

    function handleCloseError(){
        setValidationError(null);
    }

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();

        formData.set("name", name);
        formData.set("email", email);
        formData.set("avatar", avatar);
        const response = await updateProfile(dispatch, formData);
        if(response?.success){
            navigate("/user/profile");
        }
    }

    return (
        <div>
            <MetaData title="update profile" />
            <Header />
            <div className="update_profile">
                <form onSubmit={handleSubmit}>
                <h1>Update Profile</h1>
                <Input
                   icon={<AccountBoxIcon />}
                   type="text"
                   name="name"
                   placeHolder="Your name"
                   handleInvalid={handleInvalid}
                   handleChange={handleChange}
                   value={name}
                />
                <Input
                   icon={<EmailIcon />}
                   type="email"
                   placeHolder="Your email"
                   handleInvalid={handleInvalid}
                   handleChange={handleChange}
                   value={email}
                />
                <Input
                   icon={<AccountBoxIcon />}
                   type="file"
                   name="avatar"
                   accept="image/*"
                   handleInvalid={handleInvalid}
                   handleChange={handleChange}
                />
                {imagePreview && (
                    <div className="image_preview">
                        <img src={imagePreview} alt={name} />
                    </div>
                )}
                <button disabled={loading} type="submit">Submit Changes</button>
                </form>
            </div>
            { (validationError || error) && (
               <Alert
               onClose={handleCloseError}
               className="alert_form" 
               severity="error">{ validationError ?? error}</Alert>
            )} 
        </div>
    );
}

export default UpdateProfile;