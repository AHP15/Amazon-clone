import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./component/home/Home";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getAllProducts } from './service/productService';
import Login from "./component/user/Login";
import Register from './component/user/Register';
import Dashboard from "./component/admin/DashBoard";
import AdminRoute from './component/Protect/AdminRoute';
import Products from './component/admin/Products';
import ProductForm from './component/admin/ProductForm';
import { selectUser } from './slices/userSlice';
import { getUserDetail, getStripeApiKey } from "./service/userService";
import ProductInfo from "./component/product/ProductInfo";
import Basket from './component/basket/Basket';
import UserRoute from './component/Protect/UserRoute';
import Profile from './component/user/Profile';
import UpdateProfile from './component/user/UpdateProfile';
import Checkout from './component/basket/Checkout';
import Success from './component/basket/Success';
import Orders from './component/order/Orders';
import { getUserOrders } from "./service/orderService";
import AllOrders from './component/admin/AllOrders';
import AllUsers from './component/admin/AllUsers';
import ForgotPassword from './component/user/ForgotPassword';
import ResetPassword from './component/user/ResetPassword';
import AllReviews from './component/admin/AllReviews';
import UpdatePassword from './component/user/UpdatePassword';

function App() {
  
  const dispatch = useDispatch();
  const { isLoggedIn, info } = useSelector(selectUser);

  useEffect(() => {
    getAllProducts(dispatch);
    if(isLoggedIn){
      getUserDetail(dispatch);
    }
    if(info){
      getUserOrders(dispatch);
      getStripeApiKey(dispatch);
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/forgot/password" element={<ForgotPassword />}/>
          <Route path="/password/reset/:token" element={<ResetPassword />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductInfo />}/>
          <Route path="/basket" element={<Basket />}/>

          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product/all" element={<Products />} />
            <Route path="/admin/product/new" element={<ProductForm />} />
            <Route path="/admin/product/:id" element={<ProductForm />} />
            <Route path="/admin/orders" element={<AllOrders />} />
            <Route path="/admin/users" element={<AllUsers />} />
            <Route path="/admin/reviews" element={<AllReviews />} />
          </Route>

          <Route element={<UserRoute />}>
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/profile/update" element={<UpdateProfile />}/>
            <Route path="/user/password/update" element={<UpdatePassword />} />
            <Route path="/ckeckout" element={<Checkout />}/>
            <Route path="/success" element={<Success />}/>
            <Route path="/orders" element={<Orders />}/>
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
