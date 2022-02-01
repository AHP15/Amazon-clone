import MetaData from "../../MetaData";
import Header from "../home/Header";
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Input from "./Input";
import { useState } from "react";
import { changePassword } from "../../service/userService";
import { Alert } from "@mui/material";

function UpdatePassword(){
    
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    function handleInvalid(e){
        setError(prev => `${prev? prev:""} and Invalid ${e.target.name}`)
    }
    function handleChange(e){
        if(e.target.name === "password"){
            setOldPassword(e.target.value);
        }
        else if(e.target.name === "new"){
            setNewPassword(e.target.value);
        }else{
            setConfirmNewPassword(e.target.value);
        }
        setError(null);
    }
    async function handleSubmit(e){
        e.preventDefault();
        if(newPassword !== confirmNewPassword){
            return setError("password does not match!");
        }

        setLoading(true);

        const response = await changePassword({
            oldPassword,
            newPassword,
            confirmNewPassword
        });

        if(response.success){
            setSuccess("password changed successfully");
            setOldPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
        }else{
            setError(response);
        }
        setLoading(false);
    }

    return (
        <div className="updatePassword">
            <MetaData title="update password" />
            <Header />
            <div className="update_profile">
                <form onSubmit={handleSubmit}>
                    <h1>Update Password</h1>
                <Input
                   icon={<VpnKeyIcon />}
                   type="password"
                   name="password"
                   placeHolder="Your old password"
                   handleInvalid={handleInvalid}
                   handleChange={handleChange}
                   value={oldPassword}
                />
                <Input
                   icon={<LockIcon />}
                   type="password"
                   name="new"
                   placeHolder="Your new password"
                   handleInvalid={handleInvalid}
                   handleChange={handleChange}
                   value={newPassword}
                />
                <Input
                   icon={<LockIcon />}
                   type="password"
                   name="confirm"
                   placeHolder="Confirm new password"
                   handleInvalid={handleInvalid}
                   handleChange={handleChange}
                   value={confirmNewPassword}
                />
                <button disabled={loading} type="submit">Change</button>
                </form>
            </div>
            {error && (
                <Alert
                onClose={() =>{setError(null)}}
                className="alert_form" 
                severity="error">{error}</Alert>
            )}
            {success && (
                <Alert
                onClose={() =>{setSuccess(null)}}
                className="alert_form" 
                severity="success">{success}</Alert>
            )}
        </div>
    );
}

export default UpdatePassword;