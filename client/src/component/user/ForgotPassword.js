import { useState } from "react";
import MetaData from "../../MetaData";
import Input from "./Input";
import Logo from "./Logo";
import EmailIcon from '@mui/icons-material/Email';
import { forgotPassword } from "../../service/userService";
import { Alert } from "@mui/material";


function ForgotPassword(){
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    function handleInvalid(){
        setError("Invalid email")
    }
    function handleChange(e){
        setEmail(e.target.value);
        setError(null);
    }
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);

        const response = await forgotPassword(email);

        if(response.success){
            setSuccess(response.message);
            setLoading(false);
            setEmail("");
        }else{
            console.log(response)
            setError(response);
            setLoading(false);
        }
    }

    return (
        <div className="forgotPassword">
            <MetaData title="forgot password"/>
            <Logo />
            <form onSubmit={handleSubmit}>
                <h1>Forgot password</h1>
                <Input
                   icon={<EmailIcon />}
                   type="email"
                   placeHolder="Your email"
                   handleInvalid={handleInvalid}
                   handleChange={handleChange}
                   value={email}
                />
                <button disabled={loading} type="submit">Send</button>
            </form>
            {error && (
                <Alert
                   onClose={() =>{setError(null)}}
                   className="alert_form" 
                   severity="error"
                >{error}</Alert>
            )}

            {success && (
                <Alert
                   onClose={() =>{setSuccess(null)}}
                   className="alert_form" 
                   severity="success"
                >{success}</Alert>
            )}
        </div>
    );
}

export default ForgotPassword;