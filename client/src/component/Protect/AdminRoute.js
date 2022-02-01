import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { selectUser } from '../../slices/userSlice';

function AdminRoute() {

    const { isLoggedIn, info } = useSelector(selectUser);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        if(isLoggedIn && info){
            setLoading(false);
        }
    }, [isLoggedIn, info]);

    return (
        loading ||(isLoggedIn && info.role === "admin")? <Outlet />: <Navigate to="/" />
    );
}

export default AdminRoute;
