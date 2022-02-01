import { Skeleton } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../slices/productSlice';
import "../../styles/home/Home.css";
import Banner from './Banner';
import Header from "./Header";
import ProductCard from './ProductCard';
import AlertError from "../Error/AlertError";
import Footer from "./Footer";
import MetaData from "../../MetaData";
import { selectUser } from '../../slices/userSlice';

function Home() {
    const { error, loading, products } = useSelector(selectProducts);
    const { error: userError } = useSelector(selectUser);
    return (
        <div className='home'>
           <MetaData title="Amazon-clone" />
           <Header /> 
           <Banner />
           <div className='products_container'>
               {
                   products.length > 0 && products.map(product => (
                      <ProductCard key={product._id} product={product} />
                    ))
               }
               {
                   loading && Array(8).fill(null).map((_, i) => (
                    <Skeleton
                       key={i}
                       sx={{ bgcolor: 'white', margin:"10px", borderRadius:"5px" }}
                       variant="rectangular"
                       width={280}
                       height={300}
                    /> 
                   ))
               }
               {
                   (error || userError) && <AlertError error={`${error? error:userError}`} />
               }
           </div>

           <Footer />
        </div>
    )
}

export default Home
