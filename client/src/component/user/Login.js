import React, { useState, useEffect } from 'react'
import Input from './Input';
import Logo from './Logo';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import "../../styles/user/Login.css";
import { useNavigate, Link } from 'react-router-dom';
import AlertError from "../Error/AlertError";
import { login } from "../../service/userService";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, isLoggedIn} = useSelector(selectUser);

    const [validationError, setValidationError] = useState(null);
    const [loginInfo, setLoginInfo] = useState({
        email:"",
        password: ""
    });

    function handleChange(e){
        setLoginInfo(log => {
            return {
                ...log,
                [e.target.name]:e.target.value
            }
        });
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
        login(dispatch, loginInfo.email, loginInfo.password);
        setLoginInfo({
            email:"",
            password: ""
        });
    }

    useEffect(() =>{
        if(isLoggedIn){
            navigate("/");
        }
    }, [dispatch, isLoggedIn, navigate]);

    return (
        <div className='login'>
            <Logo />
            <form onSubmit={handleSubmit}>
                <h1>Sign-In</h1>
                <Input
                   icon={<EmailIcon />}
                   type="email"
                   placeHolder="Your email"
                   handleInvalid={handleInvalid}
                   handleChange={handleChange}
                   value={loginInfo.email}
                />
                <Input
                   icon={<LockIcon />}
                   type="password"
                   placeHolder="Your password"
                   handleInvalid={handleInvalid}
                   handleChange={handleChange}
                   value={loginInfo.password}
                />
                <Link
                   className='forgotpassword'
                   to="/forgot/password"
                >Forgot your password?</Link>
                <button disabled={loading} type='submit'>Sign In</button>
            </form>

            <button className='create' onClick={() =>{navigate("/register");}}>Create account</button>

            { (error || validationError) && (
                <AlertError error={`${validationError? validationError:error}`} />
            )}
        </div>
    )
}

export default Login
