import { useState } from "react";
import MetaData from "../../MetaData";
import Input from "./Input";
import Logo from "./Logo";
import LockIcon from '@mui/icons-material/Lock';
import { resetPassword } from "../../service/userService";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "@mui/material";


function ResetPassword(){
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    function handleInvalid(e){}
    function handleChange(e){
        if(e.target.name === "newPassword"){
            setPassword(e.target.value);
        }else{
            setConfirmPassword(e.target.value);
        }
    }

    async function handleSubmit(e){
        e.preventDefault();
        if(password !== confirmPassword){
            return setError("password does not match !");
        }
        setLoading(true);

        const response = await resetPassword(
            {password,confirmPassword},
            params.token
        );

        if(response.success){
            navigate("/login");
        }else{
            setError(response);
        }
        setLoading(false);
    }

    return (
        <div className="resetPassword">
            <MetaData title="reset password"/>
            <Logo />
            <form onSubmit={handleSubmit}>
                <h1>Reset Password</h1>
                <Input
                   icon={<LockIcon />}
                   type="password"
                   name="newPassword"
                   placeHolder="New password"
                   handleInvalid={handleInvalid}
                   handleChange={handleChange}
                   value={password}
                />
                <Input
                   icon={<LockIcon />}
                   type="password"
                   name="confirmPassword"
                   placeHolder="Confirm new password"
                   handleInvalid={handleInvalid}
                   handleChange={handleChange}
                   value={confirmPassword}
                />
                <button disabled={loading} type="submit">Submit</button>
            </form>
            {error && (
                <Alert
                onClose={() =>{setError(null)}}
                className="alert_form" 
                severity="error"
                >
                    {error}
                </Alert>
            )}    
        </div>
    );
}

export default ResetPassword;