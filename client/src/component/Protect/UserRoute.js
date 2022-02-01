import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { selectUser } from '../../slices/userSlice';

function UserRoute() {

    const { isLoggedIn, info } = useSelector(selectUser);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        if(isLoggedIn){
            setLoading(false);
        }
    }, [isLoggedIn, info]);

    return (
        loading ||isLoggedIn? <Outlet />: <Navigate to="/" />
    );
}

export default UserRoute;