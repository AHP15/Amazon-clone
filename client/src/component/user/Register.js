import React, {useEffect, useState} from 'react';
import Input from './Input';
import Logo from './Logo';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';
import AlertError from "../Error/AlertError";
import { register } from "../../service/userService";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, isLoggedIn} = useSelector(selectUser);

    const [validationError, setValidationError] = useState(null);
    const [registerInfo, setRegisterInfo] = useState({
        name:"",
        email:"",
        password: ""
    });
    const [avatar, setAvatar] = useState("./Profile.png");

    function handleChange(e){
        if(e.target.name === "avatar"){
            setAvatar(e.target.files[0]);
        }else{
            setRegisterInfo(log => {
                return {
                    ...log,
                    [e.target.name]:e.target.value
                }
            });
        }
        setValidationError(null);
    }

    function handleInvalid(e){
        setValidationError(err => {
            if(err){
                return err + ` and Invalid ${e.target.name}`;
            }
            return `Invalid ${e.target.name}`;
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", registerInfo.name);
        myForm.set("email", registerInfo.email);
        myForm.set("password", registerInfo.password);
        myForm.set("avatar", avatar);
        register(dispatch, myForm);
    }

    useEffect(() =>{
        if(isLoggedIn){
            navigate("/");
        }
    }, [dispatch, isLoggedIn, navigate]);


    return (
        <div className='register'>
            <Logo />
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <h1>Sign-Up</h1>
                <Input
                   icon={<AccountBoxIcon />}
                   type="text"
                   name="name"
                   placeHolder="Your name"
                   handleInvalid={handleInvalid}
                   handleChange={handleChange}
                   value={registerInfo.name}
                />
                <Input
                   icon={<EmailIcon />}
                   type="email"
                   placeHolder="Your email"
                   handleInvalid={handleInvalid}
                   handleChange={handleChange}
                   value={registerInfo.email}
                />
                <Input
                   icon={<LockIcon />}
                   type="password"
                   placeHolder="Your password"
                   handleInvalid={handleInvalid}
                   handleChange={handleChange}
                   value={registerInfo.password}
                />
                <Input
                   icon={<AccountBoxIcon />}
                   type="file"
                   name="avatar"
                   accept="image/*"
                   handleInvalid={handleInvalid}
                   handleChange={handleChange}
                />
                <button disabled={loading} type='submit'>Sign Up</button>
            </form> 
            { (error || validationError) && (
                <AlertError error={`${validationError? validationError:error}`} />
            )} 
        </div>
    )
}

export default Register;
